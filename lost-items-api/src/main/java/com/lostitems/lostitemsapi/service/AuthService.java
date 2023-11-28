package com.lostitems.lostitemsapi.service;

import com.lostitems.lostitemsapi.dto.SignInDto;
import com.lostitems.lostitemsapi.exception.FoundItInvalidRefreshTokenException;
import com.lostitems.lostitemsapi.security.FoundItUserDetails;
import com.lostitems.lostitemsapi.security.JwtAuthUtils;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.security.oauth2.jwt.JwsHeader;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
@Slf4j
public class AuthService {

    private AuthenticationManager authenticationManager;
    private UserService userService;
    private JwtEncoder jwtEncoder;
    private JwtDecoder jwtDecoder;

    public Map<String, String> refreshAccessToken(String refreshToken) {
        if (refreshToken == null) {
            throw new FoundItInvalidRefreshTokenException("Token is null");
        } else if (!refreshToken.startsWith("Bearer ")) {
            throw new FoundItInvalidRefreshTokenException("Token does not start with 'Bearer'");
        } else {
            Jwt decodedJwt = jwtDecoder.decode(refreshToken.replace("Bearer ", ""));
            String stringUserId = (String) jwtDecoder.decode(refreshToken.replace("Bearer ", "")).getClaims().get("userId");
            if (stringUserId == null) {
                throw new FoundItInvalidRefreshTokenException("Token does not contain a claim with key 'userId'");
            }
            UUID userId = UUID.fromString(stringUserId);
            String newAccessToken = createAccessToken(decodedJwt.getSubject(), userId);
            return Map.of("accessToken", newAccessToken, "refreshToken", refreshToken.replace("Bearer ", ""));
        }
    }

    public Map<String, String> signIn(SignInDto signInDto) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(signInDto.emailOrPhoneNumber(), signInDto.password())
        );
        String accessToken = createAccessToken(
                signInDto.emailOrPhoneNumber(),
                ((FoundItUserDetails) authentication.getPrincipal()).getUserId()
        );

        // Create Refresh Token
        Instant now = Instant.now();
        JwtClaimsSet refreshTokenClaimsSet = JwtClaimsSet.builder()
                .issuedAt(now)
                .expiresAt(now.plusSeconds(JwtAuthUtils.REFRESH_TOKEN_EXPIRATION_TIME))
                .subject(signInDto.emailOrPhoneNumber())
                .claim(
                        "userId",
                        ((FoundItUserDetails) authentication.getPrincipal()).getUserId())
                .build();
        JwtEncoderParameters refreshTokenEncoderParameters =
                JwtEncoderParameters.from(
                        JwsHeader.with(MacAlgorithm.HS512).build(),
                        refreshTokenClaimsSet
                );

        String refreshToken = jwtEncoder.encode(refreshTokenEncoderParameters).getTokenValue();
        return Map.of("accessToken", accessToken, "refreshToken", refreshToken);
    }

    public String createAccessToken(String subject, UUID userId) {
        Instant now = Instant.now();
        JwtClaimsSet accessTokenClaimsSet = JwtClaimsSet.builder()
                .issuedAt(now)
                .expiresAt(now.plusSeconds(JwtAuthUtils.ACCESS_TOKEN_EXPIRATION_TIME))
                .subject(subject)
                .claim(
                        "userId",
                        userId)
                .build();
        JwtEncoderParameters accessTokenEncoderParameters =
                JwtEncoderParameters.from(
                        JwsHeader.with(MacAlgorithm.HS512).build(),
                        accessTokenClaimsSet
                );
        return jwtEncoder.encode(accessTokenEncoderParameters).getTokenValue();
    }
}