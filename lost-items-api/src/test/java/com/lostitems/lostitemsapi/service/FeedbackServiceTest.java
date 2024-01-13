package com.lostitems.lostitemsapi.service;

import com.lostitems.lostitemsapi.dto.Feedback.AddFeedbackRequestDto;
import com.lostitems.lostitemsapi.dto.Feedback.FeedbackStatisticsDto;
import com.lostitems.lostitemsapi.dto.Feedback.GetUserFeedbackItemDto;
import com.lostitems.lostitemsapi.dto.Feedback.GetUserFeedbacksDto;
import com.lostitems.lostitemsapi.utils.BaseTest;
import com.lostitems.lostitemsapi.utils.JwtTestUtils;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatusCode;

import java.util.List;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.DEFINED_PORT)
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
@Slf4j
public class FeedbackServiceTest extends BaseTest {
    @Autowired
    private FeedbackService feedbackService;
    @Test
    @Order(0)
    void FeedbackServiceTest_UserHasFeedback() {
        FeedbackStatisticsDto feedbackStatisticsDto = feedbackService.getFeedbackStatisticsByUser(UUID.fromString(JwtTestUtils.DUMMY_USER_ID));
        assertEquals(2, feedbackStatisticsDto.ratingCount());
        assertEquals(2.8, feedbackStatisticsDto.averageRating());
    }

    @Test
    @Order(1)
    void FeedbackServiceTest_UserDoesNotHaveFeedback() {
        FeedbackStatisticsDto feedbackStatisticsDto = feedbackService.getFeedbackStatisticsByUser(UUID.fromString("0ebacabc-83fa-11ee-b962-0242ac120003"));
        assertEquals(0,feedbackStatisticsDto.ratingCount());
        assertEquals(0,feedbackStatisticsDto.averageRating());
    }

    @Test
    @Order(2)
    void testGetUserFeedbacks() {
        assertDoesNotThrow(
                () -> {
                    GetUserFeedbacksDto feedbacks = feedbackService.getUserFeedbackList(UUID.fromString(JwtTestUtils.DUMMY_USER_ID), null, 0, 10);
                    List<GetUserFeedbackItemDto> expectedFeedbacks = List.of(
                            new GetUserFeedbackItemDto(UUID.fromString("0ebacabc-83fa-11ee-b962-0242ac120003"), 3.0f, "his is a comment", "yasser karami", null),
                            new GetUserFeedbackItemDto(UUID.fromString("0ebacabc-83fa-11ee-b962-0242ac120004"), 2.6f, "his is a comment", "userXY userXY", null)
                    );
                    assertEquals(expectedFeedbacks.size(), feedbacks.count);
                    log.warn(feedbacks.toString());
                    assertTrue(expectedFeedbacks.containsAll(feedbacks.feedbacks));
                    assertTrue(feedbacks.feedbacks.containsAll(expectedFeedbacks));
                }
        );
    }

    @Test
    @Order(3)
    void testCreateFeedback_validValues() {
        assertDoesNotThrow(
                () -> {
                    feedbackService.createOrUpdateFeedback(JwtTestUtils.DUMMY_TOKEN, UUID.fromString(JwtTestUtils.DUMMY_USER_ID_2), new AddFeedbackRequestDto(5.0f, "Good"));
                    GetUserFeedbacksDto feedbacks = feedbackService.getUserFeedbackList(UUID.fromString(JwtTestUtils.DUMMY_USER_ID_2), null, 0, 10);
                    List<GetUserFeedbackItemDto> expectedFeedbacks = List.of(
                        new GetUserFeedbackItemDto(UUID.fromString(JwtTestUtils.DUMMY_USER_ID), 5.0f, "Good", "userXf userXl", null)
                    );
                    assertEquals(expectedFeedbacks.size(), feedbacks.count);
                    log.warn(feedbacks.toString());
                    assertTrue(feedbacks.feedbacks.containsAll(expectedFeedbacks));
                    assertTrue(expectedFeedbacks.containsAll(feedbacks.feedbacks));
                }
        );
    }

    @Test
    @Order(4)
    void testUpdateFeedback_validValues() {
        assertDoesNotThrow(
                () -> {
                    HttpStatusCode created =  feedbackService.createOrUpdateFeedback(JwtTestUtils.DUMMY_TOKEN_2, UUID.fromString(JwtTestUtils.DUMMY_USER_ID), new AddFeedbackRequestDto(5.0f, "Good"));
                    HttpStatusCode updated = feedbackService.createOrUpdateFeedback(JwtTestUtils.DUMMY_TOKEN_2, UUID.fromString(JwtTestUtils.DUMMY_USER_ID), new AddFeedbackRequestDto(1.0f, "Not Good"));

                    GetUserFeedbacksDto feedbacks = feedbackService.getUserFeedbackList(UUID.fromString(JwtTestUtils.DUMMY_USER_ID), null, 0, 10);
                    GetUserFeedbackItemDto expectedFeedback = new GetUserFeedbackItemDto(UUID.fromString(JwtTestUtils.DUMMY_USER_ID_2), 1.0f, "Not Good", "Mimoun Ghordou", null);
                    assertEquals(200, created.value());
                    assertEquals(201, updated.value());
                    log.warn(feedbacks.toString());
                    assertTrue(feedbacks.feedbacks.contains(expectedFeedback));

                }
        );
    }

}
