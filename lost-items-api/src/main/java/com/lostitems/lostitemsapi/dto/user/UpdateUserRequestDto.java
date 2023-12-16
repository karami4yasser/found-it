package com.lostitems.lostitemsapi.dto.user;

import com.lostitems.lostitemsapi.validation.constraints.PhoneNumber;
import jakarta.validation.constraints.NotEmpty;

public record UpdateUserRequestDto (
        @NotEmpty(message = "first name cannot be empty") String firstName,
        @NotEmpty(message = "last name cannot be empty") String lastName,
        @PhoneNumber String phone
) { }
