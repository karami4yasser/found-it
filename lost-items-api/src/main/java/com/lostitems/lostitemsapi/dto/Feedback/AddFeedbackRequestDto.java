package com.lostitems.lostitemsapi.dto.Feedback;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record AddFeedbackRequestDto(
        @NotNull(message = "rating is required")
        @Min(value = 1, message = "rating must be between 1 and 5")
        @Max(value = 5, message = "rating must be between 1 and 5")
        Float rating,

        @Size(max = 4096, message = "comment must be less than 4096 characters")
        String comment
) {
}
