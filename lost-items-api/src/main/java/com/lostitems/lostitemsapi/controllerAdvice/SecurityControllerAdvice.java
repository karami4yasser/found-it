package com.lostitems.lostitemsapi.controllerAdvice;

import com.lostitems.lostitemsapi.dto.FoundItExceptionResponse;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.WebRequest;

import java.time.Instant;

@ControllerAdvice
@RestController
public class SecurityControllerAdvice {
    @ExceptionHandler(AuthenticationException.class)
    public final ResponseEntity<FoundItExceptionResponse> handleAuthenticationException(
            AuthenticationException ex,
            WebRequest _request) {
        return new ResponseEntity<>(
                new FoundItExceptionResponse(
                        ex.getMessage(),
                        Instant.now(),
                        HttpStatusCode.valueOf(401)
                ),
                HttpStatusCode.valueOf(401)
        );
    }
}
