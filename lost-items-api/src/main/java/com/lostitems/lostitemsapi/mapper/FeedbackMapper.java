package com.lostitems.lostitemsapi.mapper;

import com.lostitems.lostitemsapi.dto.Feedback.AddFeedbackRequestDto;
import com.lostitems.lostitemsapi.dto.Feedback.GetUserFeedbackItemDto;
import com.lostitems.lostitemsapi.model.Feedback;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring",
        unmappedSourcePolicy = org.mapstruct.ReportingPolicy.IGNORE,
        unmappedTargetPolicy = org.mapstruct.ReportingPolicy.IGNORE)
public interface FeedbackMapper {
    Feedback createFeedbackRequestDtoToFeedbackMapper(AddFeedbackRequestDto dto);
    @Mapping(target = "raterName",
            expression = "java(feedback.getRater().getFirstName() + \" \" + feedback.getRater().getLastName())")
    @Mapping(target = "raterId", expression = "java(feedback.getRater().getId())")
    GetUserFeedbackItemDto feedbackToGetUserFeedbackItemDto(Feedback feedback);
}
