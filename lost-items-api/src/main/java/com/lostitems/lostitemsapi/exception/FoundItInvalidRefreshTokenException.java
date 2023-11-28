package com.lostitems.lostitemsapi.exception;

import org.springframework.http.HttpStatusCode;

public class FoundItInvalidRefreshTokenException extends FoundItException{
    public FoundItInvalidRefreshTokenException(String cause) {
        super(String.format("The refresh token is invalid: %s", cause), HttpStatusCode.valueOf(401));
    }
}
