package com.lostitems.lostitemsapi.dto.user;

import com.lostitems.lostitemsapi.validation.constraints.PhoneNumber;
import jakarta.validation.constraints.NotEmpty;

public record CreateUserRequestDto(
        @NotEmpty(message = "first name cannot be empty") String firstName,
        @NotEmpty(message = "last name cannot be empty") String lastName,
        @NotEmpty(message = "phone number cannot be empty") @PhoneNumber String phone,
        @NotEmpty(message = "password cannot be empty") String password
) {
}
