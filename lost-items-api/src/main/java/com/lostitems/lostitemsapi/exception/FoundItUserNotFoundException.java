package com.lostitems.lostitemsapi.exception;

import org.springframework.http.HttpStatusCode;

public class FoundItUserNotFoundException extends FoundItException{
    public FoundItUserNotFoundException() {
        super("User not found", HttpStatusCode.valueOf(404));
    }
}
