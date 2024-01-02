package com.lostitems.lostitemsapi.dto.report;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;

public record CreateReportRequestDto(
        @NotEmpty(message = "title is required")
        String title,
        @Size(max = 4096, message = "comment must be less than 4096 characters")
        String comment
) {
}
