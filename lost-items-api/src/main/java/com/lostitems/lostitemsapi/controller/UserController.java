package com.lostitems.lostitemsapi.controller;

import com.lostitems.lostitemsapi.dto.user.CreateUserRequestDto;
import com.lostitems.lostitemsapi.service.UserService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/users")
@AllArgsConstructor
public class UserController {
    private final UserService userService;

    @PostMapping(value = "", consumes = "application/json")
    public ResponseEntity<Void> createUser(
            @Valid @RequestBody CreateUserRequestDto dto
            ) {
        userService.createUser(dto);
        return ResponseEntity.status(201).build();
    }
}
