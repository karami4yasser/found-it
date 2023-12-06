package com.lostitems.lostitemsapi.controller;

import com.lostitems.lostitemsapi.dto.user.CreateUserRequestDto;
import com.lostitems.lostitemsapi.dto.user.GetUserDetailsResponseDto;
import com.lostitems.lostitemsapi.service.UserService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/users")
@AllArgsConstructor
public class UserController {
    private final UserService userService;

    @PostMapping(value = "", consumes = "application/json")
    @PreAuthorize("permitAll()")
    public ResponseEntity<Map<String, String>> createUser(
            @Valid @RequestBody CreateUserRequestDto dto
            ) {
        return new ResponseEntity<>(
                userService.createUser(dto),
                HttpStatusCode.valueOf(201)
        );
    }

    // this is just to test UI, will be changed in the future
    @GetMapping("/profile")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<GetUserDetailsResponseDto> getCurrentUserDetails(
            @RequestHeader("Authorization") String jwt
    ) {
        return new ResponseEntity<>(
                userService.getCurrentUserDetails(jwt),
                HttpStatus.OK
        );
    }
}
