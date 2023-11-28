package com.lostitems.lostitemsapi.dto;

import jakarta.validation.constraints.NotEmpty;

public record SignInDto(
        @NotEmpty(message = "email or phone number should be provided") String emailOrPhoneNumber,
        @NotEmpty(message = "password cannot be empty") String password
) {
}