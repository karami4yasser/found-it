package com.lostitems.lostitemsapi.exception;

import lombok.Getter;
import org.springframework.http.HttpStatusCode;

@Getter
public class FoundItException extends RuntimeException{
    private final String message;
    private final HttpStatusCode status;

    public FoundItException(String message, HttpStatusCode status) {
        super(message);
        this.message = message;
        this.status = status;
    }
}