package com.lostitems.lostitemsapi.service;

import com.lostitems.lostitemsapi.dto.Feedback.AddFeedbackRequestDto;
import com.lostitems.lostitemsapi.dto.Feedback.GetUserFeedbackItemDto;
import com.lostitems.lostitemsapi.dto.report.CreateReportRequestDto;
import com.lostitems.lostitemsapi.mapper.ReportMapper;
import com.lostitems.lostitemsapi.model.Feedback;
import com.lostitems.lostitemsapi.model.Report;
import com.lostitems.lostitemsapi.repository.ReportRepository;
import com.lostitems.lostitemsapi.security.JwtAuthUtils;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional
public class ReportService {

    private final ReportRepository reportRepository;
    private final ReportMapper reportMapper;
    private final JwtDecoder jwtDecoder;
    private UserService userService;

    @Autowired
    public void setUserService(UserService userService) {
        this.userService = userService;
    }

    public void createReport(String jwt, UUID ratedId, CreateReportRequestDto createReportRequestDto) {
        JwtAuthUtils.checkTokenValidity(jwt);
        JwtAuthUtils.TokenUserInfo tokenUserInfo = JwtAuthUtils.getUserInfoFromToken(jwtDecoder, jwt);
        Report report = reportMapper.createReportRequestDtoToFeedbackMapper(createReportRequestDto);
        report.setReported(userService.findUserById(ratedId));
        report.setReporter(userService.findUserById(tokenUserInfo.userId()));
        reportRepository.save(report);
    }
}
