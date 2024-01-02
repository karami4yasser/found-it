package com.lostitems.lostitemsapi.dto.Feedback;

import java.util.Objects;
import java.util.UUID;

public record GetUserFeedbackItemDto(
        UUID raterId,
        Float rating,
        String comment,
        String raterName,
        String raterImage
) {
    @Override
    public boolean equals(Object obj) {
        if (obj instanceof GetUserFeedbackItemDto otherRating)
            return Objects.equals(this.comment, otherRating.comment) &&
                    Objects.equals(this.raterImage, otherRating.raterImage()) &&
                    Objects.equals(this.rating, otherRating.rating) &&
                    Objects.equals(this.raterName, otherRating.raterName);
        return false;
    }
}
