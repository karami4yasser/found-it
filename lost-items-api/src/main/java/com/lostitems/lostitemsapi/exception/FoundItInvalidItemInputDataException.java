package com.lostitems.lostitemsapi.exception;

import org.springframework.http.HttpStatusCode;

public class FoundItInvalidItemInputDataException extends FoundItException{
    public FoundItInvalidItemInputDataException(String inputData) {
        super(String.format("Input data is not valid : %s", inputData), HttpStatusCode.valueOf(400));
    }
}
