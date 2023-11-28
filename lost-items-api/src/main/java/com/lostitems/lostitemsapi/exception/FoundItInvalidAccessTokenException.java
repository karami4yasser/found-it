package com.lostitems.lostitemsapi.exception;

import org.springframework.http.HttpStatusCode;

public class FoundItInvalidAccessTokenException extends FoundItException{
    public FoundItInvalidAccessTokenException(String cause) {
        super(String.format("The access token is invalid: %s", cause), HttpStatusCode.valueOf(400));
    }
}
