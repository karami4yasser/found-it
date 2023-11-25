package com.lostitems.lostitemsapi.controller;

import com.lostitems.lostitemsapi.exception.FoundItUserNotFoundException;
import com.lostitems.lostitemsapi.model.User;
import com.lostitems.lostitemsapi.service.UserService;
import io.restassured.RestAssured;
import io.restassured.response.Response;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatusCode;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static io.restassured.RestAssured.given;
import static io.restassured.config.DecoderConfig.ContentDecoder.DEFLATE;
import static io.restassured.config.DecoderConfig.decoderConfig;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.DEFINED_PORT)
class UserControllerTest extends BaseControllerTest{

    private final UserService userService;

    @Autowired
    public UserControllerTest(UserService userService) {
        this.userService = userService;
    }

    @Test
    void testCreateUser_validFields() {

        Map<String,Object> request = new HashMap<>();
        request.put("firstName", "userZf");
        request.put("lastName", "userZl");
        request.put("phone", "+212644983674");
        request.put("password", "pass123");

        given().config(
                RestAssured.config().decoderConfig(
                        decoderConfig().contentDecoders(DEFLATE
                        )))
                .contentType("application/json")
                .body(request)
                .when()
                .post(CONTEXT_PATH)
                .then()
                .statusCode(201);

        assertDoesNotThrow(() -> {
            User user = userService.findUserByPhoneOrEmail("+212644983674");
            assertEquals("+212644983674", user.getPhone());
            assertEquals("userZf", user.getFirstName());
            assertEquals("userZl", user.getLastName());
        });

    }

    @Test
    void testCreateUser_invalidFields() {

        // the firstName and phone names are invalid
        Map<String,Object> request = new HashMap<>();
        request.put("firstName", "");
        request.put("lastName", "userLl");
        request.put("phone", "**23421234");
        request.put("password", "pass123");

        Response response = given().config(
                        RestAssured.config().decoderConfig(
                                decoderConfig().contentDecoders(DEFLATE
                                )))
                .contentType("application/json")
                .body(request)
                .when()
                .post(CONTEXT_PATH)
                .then()
                .statusCode(400)
                .and()
                .extract()
                .response();

        List<String> errors = response.jsonPath().getList("errors", String.class);
        List<String> expectedErrors = List.of("first name cannot be empty", "phone number is not valid");
        assertEquals(expectedErrors.size(), errors.size());
        assertTrue(expectedErrors.containsAll(errors));
        assertTrue(errors.containsAll(expectedErrors));

        FoundItUserNotFoundException exception = assertThrows(FoundItUserNotFoundException.class, () -> {
            userService.findUserByPhoneOrEmail("**23421234");
        });

        assertEquals(HttpStatusCode.valueOf(404), exception.getStatus());
        assertEquals("User not found",  exception.getMessage());
    }

    @Test
    void testCreateUser_phoneAlreadyUsed() {

        // the firstName and phone names are invalid
        Map<String,Object> request = new HashMap<>();
        request.put("firstName", "userFf");
        request.put("lastName", "userFl");
        request.put("phone", "+212602394387");
        request.put("password", "pass123");

        Response response = given().config(
                        RestAssured.config().decoderConfig(
                                decoderConfig().contentDecoders(DEFLATE
                                )))
                .contentType("application/json")
                .body(request)
                .when()
                .post(CONTEXT_PATH)
                .then()
                .statusCode(409)
                .and()
                .extract()
                .response();

        String error = response.jsonPath().getString("message");
        assertEquals("User with email or phone number '+212602394387' already exists", error);

        assertDoesNotThrow(() -> {
            User user = userService.findUserByPhoneOrEmail("+212602394387");
            assertEquals("+212602394387", user.getPhone());
            assertNotEquals("userFf", user.getFirstName());
            assertNotEquals("userFl", user.getLastName());
        });
    }
}