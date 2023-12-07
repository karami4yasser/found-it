package com.lostitems.lostitemsapi.service;

import com.lostitems.lostitemsapi.dto.user.CreateUserRequestDto;
import com.lostitems.lostitemsapi.exception.FoundItUserAlreadyExistException;
import com.lostitems.lostitemsapi.exception.FoundItUserNotFoundException;
import com.lostitems.lostitemsapi.model.User;
import com.lostitems.lostitemsapi.utils.BaseTest;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatusCode;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.DEFINED_PORT)
class UserServiceTest extends BaseTest {

    private final UserService userService;
    @Autowired
    public UserServiceTest(UserService userService) {
        this.userService = userService;
    }

    @Test
    void testCreateUser_userAlreadyExists() {
        FoundItUserAlreadyExistException exception =
                assertThrows(FoundItUserAlreadyExistException.class, () -> {
                    userService.createUser(new CreateUserRequestDto(
                            "userXf",
                            "userXl",
                            "+212602394387",
                            "pass"
                    ));
                });
        assertEquals("User with phone number '+212602394387' already exists", exception.getMessage());
    }

    @Test
    void testCreateUser_correctValues() {
        assertDoesNotThrow(() -> userService.createUser(new CreateUserRequestDto(
                "userYf",
                "userYl",
                "+212602394382",
                "pass"
        )));
        assertDoesNotThrow(() -> {
            User user = userService.findUserByPhoneOrEmail("+212602394382");
            assertEquals("userYf", user.getFirstName());
            assertEquals("userYl", user.getLastName());
            assertEquals("+212602394382", user.getPhone());
        });
    }

    @Test
    void testCheckPhoneOrEmailDossNotExists_userExists() {
        FoundItUserAlreadyExistException exception =
                assertThrows(FoundItUserAlreadyExistException.class, () -> {
                    userService.checkPhoneOrEmailDoesNotExists("+212602394387");
                });
        assertEquals("User with phone number '+212602394387' already exists", exception.getMessage());
        assertEquals(HttpStatusCode.valueOf(409), exception.getStatus());
    }

    @Test
    void testCheckPhoneOrEmailDoesNotExists_userDoesNotExists() {
        assertDoesNotThrow(() -> {
            userService.checkPhoneOrEmailDoesNotExists("+212602394380");
        });
    }

    @Test
    void findUserByPhoneOrEmail_userNotFound() {
        FoundItUserNotFoundException exception =
                assertThrows(FoundItUserNotFoundException.class, () -> {
                    userService.findUserByPhoneOrEmail("++212602394383");
                });
        assertEquals("User not found", exception.getMessage());
        assertEquals(HttpStatusCode.valueOf(404), exception.getStatus());
    }

    @Test
    void findUserByPhoneOrEmail_userFound() {
        assertDoesNotThrow(() -> {
            User user = userService.findUserByPhoneOrEmail("+212602394387");
            assertEquals("userXf", user.getFirstName());
            assertEquals("userXl", user.getLastName());
            assertEquals("+212602394387", user.getPhone());
        });
    }
}