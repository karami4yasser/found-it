package com.lostitems.lostitemsapi.service;

import com.lostitems.lostitemsapi.dto.SignInDto;
import com.lostitems.lostitemsapi.exception.FoundItInvalidRefreshTokenException;
import com.lostitems.lostitemsapi.model.User;
import com.lostitems.lostitemsapi.utils.BaseTest;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatusCode;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.oauth2.jwt.JwtDecoder;

import java.util.Map;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.DEFINED_PORT)
class AuthServiceTest extends BaseTest {

    protected final String INVALID_TOKEN = "Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.HNDYOqz1M_KHLKZhlCFwTK6kSC2A39Gk3hxOa3oHq9DIJxYak37tma8Bq9vBy_MpFZIMwX9z3OOIqHQEQAXulg";
    protected final String DUMMY_TOKEN = "Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIrMjEyNjAyMzk0Mzg3IiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJ1c2VySWQiOiIwZWJhY2FiYy04M2ZhLTExZWUtYjk2Mi0wMjQyYWMxMjAwMDIifQ.2Uv1UYTG_AIXOu0pSf8WlbWRnw62iDGRIpEqfBgK_zMEK96NBJHkExpeL4jZxBWcMRDZVo6-34R0Otn1TzD8ZQ";
    protected final String DUMMY_USER_ID = "0ebacabc-83fa-11ee-b962-0242ac120002";

    private final AuthService authService;
    private final UserService userService;
    private final JwtDecoder jwtDecoder;

    @Autowired
    public AuthServiceTest(JwtDecoder jwtDecoder, AuthService authService, UserService userService) {
        this.authService = authService;
        this.userService = userService;
        this.jwtDecoder = jwtDecoder;
    }

    public void validateTokens(Map<String, String> tokens,
                              String phoneNumber,
                              String firstName,
                              String lastName) {
        assertTrue(tokens.containsKey("accessToken"));
        assertTrue(tokens.containsKey("refreshToken"));
        assertNotNull(tokens.get("accessToken"));
        assertNotNull(tokens.get("refreshToken"));

        assertEquals(phoneNumber, jwtDecoder.decode(tokens.get("accessToken")).getSubject());
        assertEquals(phoneNumber, jwtDecoder.decode(tokens.get("refreshToken")).getSubject());

        String userIdFromAccessToken = (String) jwtDecoder.decode(tokens.get("refreshToken")).getClaims().get("userId");
        String userIdFromRefreshToken = (String) jwtDecoder.decode(tokens.get("refreshToken")).getClaims().get("userId");

        assertNotNull(userIdFromAccessToken);
        assertNotNull(userIdFromRefreshToken);
        assertEquals(DUMMY_USER_ID, userIdFromRefreshToken);
        assertEquals(DUMMY_USER_ID, userIdFromAccessToken);

        assertDoesNotThrow(() -> {
            User user = userService.findUserById(UUID.fromString(userIdFromAccessToken));
            assertEquals(firstName, user.getFirstName());
            assertEquals(lastName, user.getLastName());
            assertEquals(phoneNumber, user.getPhone());
        });
    }

    @Test
    void refreshAccessToken_validToken() {
        assertDoesNotThrow(() -> {
            Map<String, String> tokens = authService.refreshAccessToken(DUMMY_TOKEN);
            validateTokens(tokens, "+212602394387", "userXf", "userXl");
        });
    }

    @Test
    void refreshAccessToken__invalidToken_tokenIsNull() {
        FoundItInvalidRefreshTokenException exception =  assertThrows(FoundItInvalidRefreshTokenException.class, () -> {
            authService.refreshAccessToken(null);
        });

        assertEquals("The refresh token is invalid: Token is null", exception.getMessage());
        assertEquals(HttpStatusCode.valueOf(401), exception.getStatus());
    }

    @Test
    void refreshAccessToken__invalidToken_notStartingWithBearer() {
        FoundItInvalidRefreshTokenException exception =  assertThrows(FoundItInvalidRefreshTokenException.class, () -> {
            authService.refreshAccessToken(DUMMY_TOKEN.replace("Bearer ", "Dummy "));
        });

        assertEquals("The refresh token is invalid: Token does not start with 'Bearer'", exception.getMessage());
        assertEquals(HttpStatusCode.valueOf(401), exception.getStatus());
    }

    @Test
    void refreshAccessToken__invalidToken_doesNotContainUserId() {
        FoundItInvalidRefreshTokenException exception =  assertThrows(FoundItInvalidRefreshTokenException.class, () -> {
            authService.refreshAccessToken(INVALID_TOKEN);
        });

        assertEquals("The refresh token is invalid: Token does not contain a claim with key 'userId'", exception.getMessage());
        assertEquals(HttpStatusCode.valueOf(401), exception.getStatus());
    }

    @Test
    void signIn_correctCredentials() {
        assertDoesNotThrow(() -> {
            Map<String, String> tokens = authService.signIn(new SignInDto("+212602394387", "test123"));
            validateTokens(tokens, "+212602394387", "userXf", "userXl");
        });
    }

    @Test
    void signIn_userDoesNotExist() {
        AuthenticationException exception = assertThrows(AuthenticationException.class, () -> {
            authService.signIn(new SignInDto("+212602384383", "test123"));
        });
        assertEquals("Bad credentials", exception.getMessage());
    }

    @Test
    void signIn_wrongPassword() {
        AuthenticationException exception = assertThrows(AuthenticationException.class, () -> {
            authService.signIn(new SignInDto("+212602394387", "test1234"));
        });
        assertEquals("Bad credentials", exception.getMessage());
    }
}