package com.lostitems.lostitemsapi.dto;

import com.lostitems.lostitemsapi.validation.constraints.EmailOrPhoneNumber;
import jakarta.validation.constraints.NotEmpty;

public record SignInDto(
        @NotEmpty(message = "email or phone number should be provided") @EmailOrPhoneNumber String emailOrPhoneNumber,
        @NotEmpty(message = "password cannot be empty") String password
) {
}