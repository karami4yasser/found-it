package com.lostitems.lostitemsapi.controller;


import com.lostitems.lostitemsapi.dto.SignInDto;
import com.lostitems.lostitemsapi.service.AuthService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("auth")
@AllArgsConstructor
@CrossOrigin(originPatterns = "*")
public class SecurityController {

    private AuthService authService;

    @PostMapping("/signIn")
    @PreAuthorize("permitAll()")
    public Map<String, String> signIn(
            @Valid @RequestBody SignInDto signInDto
            ) {
        return authService.signIn(signInDto);
    }


    @PostMapping("/refreshToken")
    @PreAuthorize("permitAll()")
    public Map<String, String> refreshToken(
            @RequestHeader("Authorization") String jwt
    ) {
        return authService.refreshAccessToken(jwt);
    }
}
