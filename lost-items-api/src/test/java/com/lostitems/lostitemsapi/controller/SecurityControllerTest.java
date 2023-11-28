package com.lostitems.lostitemsapi.controller;

import com.lostitems.lostitemsapi.service.UserService;
import com.lostitems.lostitemsapi.utils.JwtTestUtils;
import io.restassured.RestAssured;
import io.restassured.http.Header;
import io.restassured.response.Response;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.oauth2.jwt.JwtDecoder;

import java.util.HashMap;
import java.util.Map;

import static io.restassured.RestAssured.given;
import static io.restassured.config.DecoderConfig.ContentDecoder.DEFLATE;
import static io.restassured.config.DecoderConfig.decoderConfig;
import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;
import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.DEFINED_PORT)
class SecurityControllerTest extends BaseControllerTest{
    private final String CONTEXT_PATH = "api/auth";
    private final JwtDecoder jwtDecoder;
    private final UserService userService;

    @Autowired
    public SecurityControllerTest(JwtDecoder jwtDecoder, UserService userService) {
        this.jwtDecoder = jwtDecoder;
        this.userService = userService;
    }

    @Test
    void testSignIn_validValues() {
        Map<String,Object> request = new HashMap<>();
        request.put("emailOrPhoneNumber", "+212602394387");
        request.put("password", "test123");

        Response response = given().config(
                        RestAssured.config().decoderConfig(
                                decoderConfig().contentDecoders(DEFLATE
                                )))
                .contentType("application/json")
                .body(request)
                .when()
                .post(CONTEXT_PATH + "/signIn")
                .then()
                .statusCode(200)
                .and()
                .extract()
                .response();

        String accessToken = response.jsonPath().getString("accessToken");
        String refreshToken = response.jsonPath().getString("refreshToken");

        JwtTestUtils.validateTokens(
                Map.of("accessToken", accessToken, "refreshToken", refreshToken),
                "+212602394387",
                "userXf",
                "userXl",
                jwtDecoder,
                userService
        );
    }

    @Test
    void testSignIn_userDoesNotExist() {
        Map<String,Object> request = new HashMap<>();
        request.put("emailOrPhoneNumber", "+212602394386");
        request.put("password", "test123");

        Response response = given().config(
                        RestAssured.config().decoderConfig(
                                decoderConfig().contentDecoders(DEFLATE
                                )))
                .contentType("application/json")
                .body(request)
                .when()
                .post(CONTEXT_PATH + "/signIn")
                .then()
                .statusCode(401)
                .and()
                .extract()
                .response();

        assertEquals("Bad credentials", response.jsonPath().getString("message"));
    }

    @Test
    void testSignIn_wrongPassword() {
        Map<String,Object> request = new HashMap<>();
        request.put("emailOrPhoneNumber", "+212602394387");
        request.put("password", "test1234");

        Response response = given().config(
                        RestAssured.config().decoderConfig(
                                decoderConfig().contentDecoders(DEFLATE
                                )))
                .contentType("application/json")
                .body(request)
                .when()
                .post(CONTEXT_PATH + "/signIn")
                .then()
                .statusCode(401)
                .and()
                .extract()
                .response();

        assertEquals("Bad credentials", response.jsonPath().getString("message"));
    }

    @Test
    void testRefreshAccessToken_validToken() {

        Response response = given().config(
                        RestAssured.config().decoderConfig(
                                decoderConfig().contentDecoders(DEFLATE
                                )))
                .contentType("application/json")
                .header(new Header("Authorization", JwtTestUtils.DUMMY_TOKEN))
                .when()
                .post(CONTEXT_PATH + "/refreshToken")
                .then()
                .statusCode(200)
                .and()
                .extract()
                .response();

        assertDoesNotThrow(() -> {
            String accessToken = response.jsonPath().getString("accessToken");
            String refreshToken = response.jsonPath().getString("refreshToken");
            Map<String, String> tokens = Map.of("accessToken", accessToken, "refreshToken", refreshToken);
            JwtTestUtils.validateTokens(tokens,
                    "+212602394387",
                    "userXf",
                    "userXl",
                    jwtDecoder,
                    userService);
        });
    }

    @Test
    void testRefreshAccessToken__invalidToken_tokenNotPassed() {
        given().config(
                        RestAssured.config().decoderConfig(
                                decoderConfig().contentDecoders(DEFLATE
                                )))
                .contentType("application/json")
                .when()
                .post(CONTEXT_PATH + "/refreshToken")
                .then()
                .statusCode(400)
                .and()
                .extract()
                .response();
    }
    @Test
    void testRefreshAccessToken__invalidToken_notStartingWithBearer() {
        Response response = given().config(
                        RestAssured.config().decoderConfig(
                                decoderConfig().contentDecoders(DEFLATE
                                )))
                .contentType("application/json")
                .header(new Header("Authorization", JwtTestUtils.DUMMY_TOKEN.replace("Bearer ", "Dummy ")))
                .when()
                .post(CONTEXT_PATH + "/refreshToken")
                .then()
                .statusCode(401)
                .and()
                .extract()
                .response();

        assertEquals("The refresh token is invalid: Token does not start with 'Bearer'", response.jsonPath().getString("message"));
    }

    @Test
    void testRefreshAccessToken__invalidToken_doesNotContainUserId() {
        Response response = given().config(
                        RestAssured.config().decoderConfig(
                                decoderConfig().contentDecoders(DEFLATE
                                )))
                .contentType("application/json")
                .header(new Header("Authorization", JwtTestUtils.INVALID_TOKEN))
                .when()
                .post(CONTEXT_PATH + "/refreshToken")
                .then()
                .statusCode(401)
                .and()
                .extract()
                .response();

        assertEquals("The refresh token is invalid: Token does not contain a claim with key 'userId'", response.jsonPath().getString("message"));
    }
}