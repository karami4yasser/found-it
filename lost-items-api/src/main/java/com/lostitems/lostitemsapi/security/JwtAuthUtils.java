package com.lostitems.lostitemsapi.security;

import com.lostitems.lostitemsapi.exception.FoundItInvalidRefreshTokenException;
import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.security.oauth2.jwt.JwsHeader;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;

import java.time.Instant;
import java.util.UUID;

public class JwtAuthUtils {
    public static final String SECRET = "1Gwe@5Xv#LpTBTD9x[)2Ws8GkTb\"9/0h6x~0^MB0wg7JHRx\\!\\aP:lih6Bj%6u*t";
    public static final long ACCESS_TOKEN_EXPIRATION_TIME = 60 * 10; // in seconds
    public static final long REFRESH_TOKEN_EXPIRATION_TIME = 2 * 24 * 60 * 60; // in seconds

    public static void checkTokenValidity(String token) {
        if (token == null) {
            throw new FoundItInvalidRefreshTokenException("Token is null");
        }
        if (!token.startsWith("Bearer ")) {
            throw new FoundItInvalidRefreshTokenException("Token does not start with 'Bearer'");
        }
    }

    public static TokenUserInfo getUserInfoFromToken(JwtDecoder jwtDecoder, String token) {
        Jwt decodedJwt = jwtDecoder.decode(token.replace("Bearer ", ""));
        String stringUserId = (String) decodedJwt.getClaims().get("userId");
        if (stringUserId == null) {
            throw new FoundItInvalidRefreshTokenException("Token does not contain a claim with key 'userId'");
        }
        return new TokenUserInfo(UUID.fromString(stringUserId), decodedJwt.getSubject());
    }

    public static String createToken(JwtAuthUtils.TokenUserInfo userInfo, Instant expirationTime, JwtEncoder jwtEncoder) {
        JwtClaimsSet accessTokenClaimsSet = JwtClaimsSet.builder()
                .issuedAt(Instant.now())
                .expiresAt(expirationTime)
                .subject(userInfo.subject())
                .claim(
                        "userId",
                        userInfo.userId())
                .build();
        JwtEncoderParameters accessTokenEncoderParameters =
                JwtEncoderParameters.from(
                        JwsHeader.with(MacAlgorithm.HS512).build(),
                        accessTokenClaimsSet
                );
        return jwtEncoder.encode(accessTokenEncoderParameters).getTokenValue();
    }

    public record TokenUserInfo(
            UUID userId,
            String subject
    ) { }
}