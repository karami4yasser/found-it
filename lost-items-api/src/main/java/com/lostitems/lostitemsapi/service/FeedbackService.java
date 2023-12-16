package com.lostitems.lostitemsapi.service;

import com.lostitems.lostitemsapi.dto.Feedback.FeedbackStatisticsDto;
import com.lostitems.lostitemsapi.repository.FeedbackRepository;
import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@AllArgsConstructor
public class FeedbackService {
    private final FeedbackRepository feedbackRepository;

    public FeedbackStatisticsDto getFeedbackStatisticsByUser(UUID userId) {
        return feedbackRepository.getFeedbackStatisticsByUser(userId);
    }


}
