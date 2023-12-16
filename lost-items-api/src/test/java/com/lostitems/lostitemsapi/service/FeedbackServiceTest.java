package com.lostitems.lostitemsapi.service;

import com.lostitems.lostitemsapi.dto.Feedback.FeedbackStatisticsDto;
import com.lostitems.lostitemsapi.utils.BaseTest;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.DEFINED_PORT)
public class FeedbackServiceTest extends BaseTest {
    @Autowired
    private FeedbackService feedbackService;
    @Test
    void FeedbackServiceTest_UserHasFeedback() {
        FeedbackStatisticsDto feedbackStatisticsDto = feedbackService.getFeedbackStatisticsByUser(UUID.fromString("0ebacabc-83fa-11ee-b962-0242ac120003"));
        assertEquals(2,feedbackStatisticsDto.ratingCount());
        assertEquals(2.8,feedbackStatisticsDto.averageRating());
    }

    @Test
    void FeedbackServiceTest_UserDoesNotHaveFeedback() {
        FeedbackStatisticsDto feedbackStatisticsDto = feedbackService.getFeedbackStatisticsByUser(UUID.fromString("0ebacabc-83fa-11ee-b962-0242ac120002"));
        assertEquals(0,feedbackStatisticsDto.ratingCount());
        assertEquals(0,feedbackStatisticsDto.averageRating());
    }

}
