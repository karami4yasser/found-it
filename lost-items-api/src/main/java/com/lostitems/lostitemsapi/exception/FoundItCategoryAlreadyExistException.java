package com.lostitems.lostitemsapi.exception;

import org.springframework.http.HttpStatusCode;

public class FoundItCategoryAlreadyExistException extends FoundItException{
    public FoundItCategoryAlreadyExistException(String name) {
        super(String.format("Category with name '%s' already exists", name), HttpStatusCode.valueOf(409));
    }
}
