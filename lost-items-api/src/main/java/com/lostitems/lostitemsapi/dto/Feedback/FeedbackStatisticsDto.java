package com.lostitems.lostitemsapi.dto.Feedback;

public record FeedbackStatisticsDto (
        Double averageRating,
        Long ratingCount
)
{ }
