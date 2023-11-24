package com.lostitems.lostitemsapi.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class EntityNotFoundException extends RuntimeException{
    private String message;
    private HttpStatus status;

    public EntityNotFoundException(String message, HttpStatus status) {
        super(message);
        this.message = message;
        this.status = status;
    }
}