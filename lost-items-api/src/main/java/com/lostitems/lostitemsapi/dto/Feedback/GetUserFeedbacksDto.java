package com.lostitems.lostitemsapi.dto.Feedback;

import com.lostitems.lostitemsapi.model.Feedback;
import org.springframework.core.convert.converter.Converter;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.stream.Collectors;

public class GetUserFeedbacksDto {

    public List<GetUserFeedbackItemDto> feedbacks;
    public long totalResults;
    public int limit;
    public long count;
    public int offset;
    public boolean hasMore;

    public GetUserFeedbacksDto() {}
    public GetUserFeedbacksDto(
            Page<Feedback> itemPage,
            Converter<Feedback, GetUserFeedbackItemDto> listConverter
    ) {
        feedbacks = itemPage.getContent().stream().map(listConverter::convert).collect(Collectors.toList());
        totalResults = itemPage.getTotalElements();
        limit = itemPage.getSize();
        count = itemPage.getNumberOfElements();
        offset = itemPage.getNumber() * itemPage.getSize();
        hasMore = itemPage.hasNext();
    }
}