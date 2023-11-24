package com.lostitems.lostitemsapi.controllerAdvice;

import com.lostitems.lostitemsapi.dto.FoundItExceptionResponse;
import com.lostitems.lostitemsapi.exception.FoundItException;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.time.Instant;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@ControllerAdvice
public class UserControllerAdvice extends ResponseEntityExceptionHandler {
    @ExceptionHandler(FoundItException.class)
    public final ResponseEntity<FoundItExceptionResponse> handleFoundItException(
            FoundItException ex,
            WebRequest _request) {
        return new ResponseEntity<>(
                new FoundItExceptionResponse(
                        ex.getMessage(),
                        Instant.now(),
                        ex.getStatus()
                ),
                ex.getStatus()
        );
    }

    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(
            MethodArgumentNotValidException ex,
            HttpHeaders _headers, HttpStatusCode status,
            WebRequest _request) {

        List<String> errors = ex.getBindingResult().getFieldErrors()
                .stream().map(DefaultMessageSourceResolvable::getDefaultMessage)
                .toList();

        return new ResponseEntity<>(
                getErrorsMap(errors, status),
                status
        );
    }

    private Map<String, Object> getErrorsMap(List<String> errors, HttpStatusCode status) {
        Map<String, Object> errorResponse = new HashMap<>();
        errorResponse.put("errors", errors);
        errorResponse.put("timestamp", Instant.now());
        errorResponse.put("status", status);
        return errorResponse;
    }
}
