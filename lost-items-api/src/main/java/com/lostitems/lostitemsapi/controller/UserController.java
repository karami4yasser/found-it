package com.lostitems.lostitemsapi.controller;

import com.lostitems.lostitemsapi.dto.user.CreateUserRequestDto;
import com.lostitems.lostitemsapi.dto.user.GetUserDetailsResponseDto;
import com.lostitems.lostitemsapi.dto.user.UpdateUserRequestDto;
import com.lostitems.lostitemsapi.exception.FoundItException;
import com.lostitems.lostitemsapi.service.UserService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.UUID;

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

    @GetMapping("/profile")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<GetUserDetailsResponseDto> getCurrentUserDetails(
            @RequestHeader(value = "Authorization") String jwt
    ) {
        return new ResponseEntity<>(
                userService.getCurrentUserDetails(jwt),
                HttpStatus.OK
        );
    }

    @GetMapping("/profile/{userId}")
    @PreAuthorize("permitAll()")
    public ResponseEntity<GetUserDetailsResponseDto> getUserDetails(
            @PathVariable(value = "userId", required = false) UUID userId
            ) {
        return new ResponseEntity<>(
                userService.getUserDetails(userId),
                HttpStatus.OK
        );
    }

    @PutMapping(value = "", consumes = "application/json")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Void> updateUserDetails(
            @RequestHeader("Authorization") String jwt,
            @Valid @RequestBody UpdateUserRequestDto dto
    ) {
        userService.updateUserDetails(jwt, dto);
        return new ResponseEntity<>(
                HttpStatus.OK
        );
    }
}
