package com.lostitems.lostitemsapi.dto.item;

import com.lostitems.lostitemsapi.enumeration.ItemType;
import com.lostitems.lostitemsapi.validation.constraints.FoundItCategory;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

public record CreateItemRequestDto(
        LocalDate date, // found or lost date
        @FoundItCategory String category,
        String photo, // link to s3 object image
        @NotNull(message = "Type should not be null") ItemType type,
        @NotBlank(message = "Title should not be empty") String title,
        @NotBlank(message = "Description should not be empty") String description,
        @NotNull(message = "Longitude should not be null") Double longitude,
        @NotNull(message = "Latitude should not be null") Double latitude,
        Double range
) {
}
