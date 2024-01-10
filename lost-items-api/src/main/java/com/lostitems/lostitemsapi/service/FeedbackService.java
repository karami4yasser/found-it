package com.lostitems.lostitemsapi.service;

import com.lostitems.lostitemsapi.dto.Feedback.AddFeedbackRequestDto;
import com.lostitems.lostitemsapi.dto.Feedback.FeedbackStatisticsDto;
import com.lostitems.lostitemsapi.dto.Feedback.GetUserFeedbacksDto;
import com.lostitems.lostitemsapi.exception.FoundItInvalidItemInputDataException;
import com.lostitems.lostitemsapi.mapper.FeedbackMapper;
import com.lostitems.lostitemsapi.model.Feedback;
import com.lostitems.lostitemsapi.repository.FeedbackRepository;
import com.lostitems.lostitemsapi.security.JwtAuthUtils;
import com.lostitems.lostitemsapi.utils.OffsetBasedPageRequest;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatusCode;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional
public class FeedbackService {

    private final FeedbackRepository feedbackRepository;
    private final FeedbackMapper feedbackMapper;
    private final JwtDecoder jwtDecoder;
    private UserService userService;

    @Autowired
    public void setUserService(UserService userService) {
        this.userService = userService;
    }

    public FeedbackStatisticsDto getFeedbackStatisticsByUser(UUID userId) {
        return feedbackRepository.getFeedbackStatisticsByUser(userId);
    }

    public HttpStatusCode createOrUpdateFeedback(String jwt, UUID ratedId, AddFeedbackRequestDto addFeedbackRequestDto) {
        JwtAuthUtils.checkTokenValidity(jwt);
        JwtAuthUtils.TokenUserInfo tokenUserInfo = JwtAuthUtils.getUserInfoFromToken(jwtDecoder, jwt);
        List<Feedback> feedbacks = feedbackRepository.findFeedbackByUserAndRater(ratedId,tokenUserInfo.userId());
        //if jwt user gave already a review to the rated user
        Feedback feedback;
        if(!feedbacks.isEmpty()) {
            //basically only one should be present
            feedback = feedbacks.get(0);
            feedback.setDate(LocalDate.now());
            feedback.setComment(addFeedbackRequestDto.comment());
            feedback.setRating(addFeedbackRequestDto.rating());
            return HttpStatusCode.valueOf(201);
        }
        else {
            feedback = feedbackMapper.createFeedbackRequestDtoToFeedbackMapper(addFeedbackRequestDto);
            feedback.setRated(userService.findUserById(ratedId));
            feedback.setRater(userService.findUserById(tokenUserInfo.userId()));
            feedback.setDate(LocalDate.now());
        }
        feedbackRepository.save(feedback);
        return HttpStatusCode.valueOf(200);
    }

    public GetUserFeedbacksDto getUserFeedbackList(UUID ratedId, String jwt, int offset, int limit) {
        if (ratedId == null && jwt == null) {
            throw new FoundItInvalidItemInputDataException("ratedId and token are null");
        }
        if (ratedId == null) {
            JwtAuthUtils.checkTokenValidity(jwt);
            ratedId = JwtAuthUtils.getUserInfoFromToken(jwtDecoder, jwt).userId();
        }
        Page<Feedback> page = feedbackRepository.findAllByRated_Id(
                ratedId,
                new OffsetBasedPageRequest(offset, limit, Sort.by(Sort.Direction.DESC, "date"))
        );
        return new GetUserFeedbacksDto(page, feedbackMapper::feedbackToGetUserFeedbackItemDto);
    }
}
