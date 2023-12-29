package com.lostitems.lostitemsapi.mapper;

import com.lostitems.lostitemsapi.dto.report.CreateReportRequestDto;
import com.lostitems.lostitemsapi.model.Report;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring",
        unmappedSourcePolicy = org.mapstruct.ReportingPolicy.IGNORE,
        unmappedTargetPolicy = org.mapstruct.ReportingPolicy.IGNORE)
public interface ReportMapper {
    Report createReportRequestDtoToFeedbackMapper(CreateReportRequestDto dto);
}
