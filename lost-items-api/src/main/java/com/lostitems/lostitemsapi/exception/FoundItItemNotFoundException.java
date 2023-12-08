package com.lostitems.lostitemsapi.exception;

import org.springframework.http.HttpStatusCode;

public class FoundItItemNotFoundException extends FoundItException{
    public FoundItItemNotFoundException() {
        super("Item was not found", HttpStatusCode.valueOf(404));
    }
}
