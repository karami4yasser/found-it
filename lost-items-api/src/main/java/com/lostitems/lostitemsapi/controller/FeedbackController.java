package com.lostitems.lostitemsapi.controller;

import com.lostitems.lostitemsapi.dto.Feedback.AddFeedbackRequestDto;
import com.lostitems.lostitemsapi.dto.Feedback.GetUserFeedbackItemDto;
import com.lostitems.lostitemsapi.dto.Feedback.GetUserFeedbacksDto;
import com.lostitems.lostitemsapi.service.FeedbackService;
import jakarta.validation.constraints.Min;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@Validated
@RestController
@RequestMapping(  "/api/feedbacks")
@Slf4j
public class FeedbackController {

    private FeedbackService feedbackService;

    @Autowired
    public void setFeedbackService(FeedbackService feedbackService) {
        this.feedbackService = feedbackService;
    }

    @PostMapping("/{ratedId}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Void> createFeedback(
            @RequestHeader("Authorization") String jwt,
            @PathVariable("ratedId") UUID ratedId,
            @RequestBody AddFeedbackRequestDto addFeedbackRequestDto
    ) {
        feedbackService.createFeedback(jwt, ratedId, addFeedbackRequestDto);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{ratedId}")
    @PreAuthorize("permitAll()")
    public ResponseEntity<GetUserFeedbacksDto> getUserFeedbackList(
            @PathVariable("ratedId")
            UUID ratedId,
            @Min(1)
            @RequestParam(value = "limit", defaultValue = "10", required = false)
            int limit,
            @Min(0)
            @RequestParam(value = "offset", defaultValue = "0", required = false)
            int offset
    ) {
        return new ResponseEntity<>(
                feedbackService.getUserFeedbackList(ratedId, null, offset, limit),
                HttpStatusCode.valueOf(200)
        );
    }

    @GetMapping("")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<GetUserFeedbacksDto> getCurrentUserFeedbackList(
            @Min(1)
            @RequestParam(value = "limit", defaultValue = "10", required = false)
            int limit,
            @Min(0)
            @RequestParam(value = "offset", defaultValue = "0", required = false)
            int offset,
            @RequestHeader(value = "Authorization", required = false) String jwt
    ) {
        return new ResponseEntity<>(
                feedbackService.getUserFeedbackList(null, jwt, offset, limit),
                HttpStatusCode.valueOf(200)
        );
    }

}
