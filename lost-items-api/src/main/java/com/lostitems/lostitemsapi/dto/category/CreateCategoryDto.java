package com.lostitems.lostitemsapi.dto.category;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.util.UUID;


public record CreateCategoryDto(
        @NotNull(message = "Category name should not be null")
        @NotEmpty(message = "Category name should not be empty")
        @Size(max = 25, message = "Category name should not exceed 25")
        String name,
        UUID parentCategoryId

) {}
