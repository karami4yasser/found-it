package com.lostitems.lostitemsapi.dto;

import org.springframework.http.HttpStatusCode;

import java.time.Instant;

public record FoundItExceptionResponse(
        String message,
        Instant timestamp,
        HttpStatusCode status
) {}
