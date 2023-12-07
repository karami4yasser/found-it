package com.lostitems.lostitemsapi.exception;

import org.springframework.http.HttpStatusCode;

public class FoundItNotPremiumException extends FoundItException{
    public FoundItNotPremiumException() {
        super("User is not premium", HttpStatusCode.valueOf(403));
    }
}
