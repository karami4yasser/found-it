package com.lostitems.lostitemsapi.dto;

import com.lostitems.lostitemsapi.validation.constraints.EmailOrPhoneNumber;
import jakarta.validation.constraints.NotEmpty;

public record SignInDto(
        @EmailOrPhoneNumber String emailOrPhone,
        @NotEmpty(message = "password cannot be empty") String password
) {
}