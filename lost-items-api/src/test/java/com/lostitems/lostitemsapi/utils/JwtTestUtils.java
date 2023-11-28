package com.lostitems.lostitemsapi.utils;

import com.lostitems.lostitemsapi.model.User;
import com.lostitems.lostitemsapi.service.UserService;
import org.springframework.security.oauth2.jwt.JwtDecoder;

import java.util.Map;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

public class JwtTestUtils {

    public static final String INVALID_TOKEN = "Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.HNDYOqz1M_KHLKZhlCFwTK6kSC2A39Gk3hxOa3oHq9DIJxYak37tma8Bq9vBy_MpFZIMwX9z3OOIqHQEQAXulg";
    public static final String DUMMY_TOKEN = "Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIrMjEyNjAyMzk0Mzg3IiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJ1c2VySWQiOiIwZWJhY2FiYy04M2ZhLTExZWUtYjk2Mi0wMjQyYWMxMjAwMDIifQ.2Uv1UYTG_AIXOu0pSf8WlbWRnw62iDGRIpEqfBgK_zMEK96NBJHkExpeL4jZxBWcMRDZVo6-34R0Otn1TzD8ZQ";
    public static final String DUMMY_USER_ID = "0ebacabc-83fa-11ee-b962-0242ac120002";

    public static void validateTokens(Map<String, String> tokens,
                                      String phoneNumber,
                                      String firstName,
                                      String lastName,
                                      JwtDecoder jwtDecoder,
                                      UserService userService) {
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

        User user = userService.findUserById(UUID.fromString(userIdFromAccessToken));
        assertEquals(firstName, user.getFirstName());
        assertEquals(lastName, user.getLastName());
        assertEquals(phoneNumber, user.getPhone());
    }
}
