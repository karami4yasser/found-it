package com.lostitems.lostitemsapi.exception;

import org.springframework.http.HttpStatusCode;

public class FoundItUserAlreadyExistException extends FoundItException{
    public FoundItUserAlreadyExistException(String phoneNumber) {
        super(String.format("User with phone number '%s' already exists", phoneNumber), HttpStatusCode.valueOf(409));
    }
}
