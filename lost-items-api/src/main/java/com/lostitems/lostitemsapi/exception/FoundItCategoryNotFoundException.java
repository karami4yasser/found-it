package com.lostitems.lostitemsapi.exception;


import org.springframework.http.HttpStatusCode;

import java.util.UUID;

public class FoundItCategoryNotFoundException extends FoundItException{
    public FoundItCategoryNotFoundException(UUID id) {
        super("Category with id '"+id.toString()+"' not found", HttpStatusCode.valueOf(404));
    }

    public FoundItCategoryNotFoundException(String name) {
        super("Category with name '"+name+"' not found", HttpStatusCode.valueOf(404));
    }

    public FoundItCategoryNotFoundException() {
        super("Category not Found", HttpStatusCode.valueOf(404));
    }
}