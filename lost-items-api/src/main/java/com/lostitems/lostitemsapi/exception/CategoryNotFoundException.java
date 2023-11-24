package com.lostitems.lostitemsapi.exception;


import org.springframework.http.HttpStatus;

import java.util.UUID;

public class CategoryNotFoundException extends EntityNotFoundException{

    public CategoryNotFoundException(UUID id) {
        super("Category with id '" + id.toString() + "' not found", HttpStatus.NOT_FOUND);
    }
}

