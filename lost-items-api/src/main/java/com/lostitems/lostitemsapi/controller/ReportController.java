package com.lostitems.lostitemsapi.controller;

import com.lostitems.lostitemsapi.dto.report.CreateReportRequestDto;
import com.lostitems.lostitemsapi.service.ReportService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@Validated
@RestController
@RequestMapping(  "/api/reports")
@Slf4j
public class ReportController {

    private ReportService reportService;

    @Autowired
    public void setFeedbackService(ReportService reportService) {
        this.reportService = reportService;
    }

    @PostMapping("/{ratedId}")
    public ResponseEntity<Void> createFeedback(
            @RequestHeader("Authorization") String jwt,
            @PathVariable("ratedId") UUID ratedId,
            @RequestBody CreateReportRequestDto createReportRequestDto
    ) {
        reportService.createReport(jwt, ratedId, createReportRequestDto);
        return ResponseEntity.ok().build();
    }

}
