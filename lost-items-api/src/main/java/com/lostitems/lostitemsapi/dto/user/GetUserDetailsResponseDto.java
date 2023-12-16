package com.lostitems.lostitemsapi.dto.user;

import com.lostitems.lostitemsapi.dto.Feedback.FeedbackStatisticsDto;
import lombok.Data;



@Data
public class GetUserDetailsResponseDto{
    private String firstName;
    private String lastName;
    private String phone;
    private FeedbackStatisticsDto feedbackStatistics;
    private Long numberOfPosts;
}
