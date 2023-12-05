package com.lostitems.lostitemsapi.service;

import com.lostitems.lostitemsapi.dto.SignInDto;
import com.lostitems.lostitemsapi.security.FoundItUserDetails;
import com.lostitems.lostitemsapi.security.JwtAuthUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.security.oauth2.jwt.JwsHeader;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final AuthenticationManager authenticationManager;
    private final JwtEncoder jwtEncoder;
    private final JwtDecoder jwtDecoder;

    public Map<String, String> refreshAccessToken(String refreshToken) {
        JwtAuthUtils.checkTokenValidity(refreshToken);
        JwtAuthUtils.TokenUserInfo userInfo = JwtAuthUtils.getUserInfoFromToken(jwtDecoder, refreshToken);
        String newAccessToken = JwtAuthUtils.createToken(userInfo, Instant.now().plusSeconds(JwtAuthUtils.ACCESS_TOKEN_EXPIRATION_TIME), jwtEncoder);
        return Map.of("accessToken", newAccessToken, "refreshToken", refreshToken.replace("Bearer ", ""));
    }

    public Map<String, String> signIn(SignInDto signInDto) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(signInDto.emailOrPhone(), signInDto.password())
        );

        Instant now = Instant.now();

        String accessToken = JwtAuthUtils.createToken(
                new JwtAuthUtils.TokenUserInfo(
                        ((FoundItUserDetails) authentication.getPrincipal()).getUserId(),
                        signInDto.emailOrPhone()
                ),
                now.plusSeconds(JwtAuthUtils.ACCESS_TOKEN_EXPIRATION_TIME),
                jwtEncoder
        );

        // Create Refresh Token
        String refreshToken = JwtAuthUtils.createToken(
                new JwtAuthUtils.TokenUserInfo(
                        ((FoundItUserDetails) authentication.getPrincipal()).getUserId(),
                        signInDto.emailOrPhone()
                ),
                now.plusSeconds(JwtAuthUtils.REFRESH_TOKEN_EXPIRATION_TIME),
                jwtEncoder
        );

        return Map.of("accessToken", accessToken, "refreshToken", refreshToken);
    }

}