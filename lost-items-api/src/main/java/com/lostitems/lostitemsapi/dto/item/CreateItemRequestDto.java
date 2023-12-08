package com.lostitems.lostitemsapi.dto.item;

import com.lostitems.lostitemsapi.enumeration.ItemType;
import jakarta.validation.constraints.NotBlank;

import java.time.LocalDate;

public record CreateItemRequestDto(
        @NotBlank(message = "Date should not be empty") LocalDate date, // found or lost date
        String categoryName,
        String photo, // link to s3 object image
        @NotBlank(message = "Type should not be empty") ItemType type,
        @NotBlank(message = "Title should not be empty") String title,
        @NotBlank(message = "Description should not be empty") String description,
        @NotBlank(message = "Longitude should not be empty") double longitude,
        @NotBlank(message = "Latitude should not be empty") double latitude,
        double range
) {
}
