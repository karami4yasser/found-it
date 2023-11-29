package com.lostitems.lostitemsapi.validation;

import com.lostitems.lostitemsapi.validation.constraints.EmailOrPhoneNumber;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import java.util.regex.Pattern;

public class EmailOrPhoneNumberValidator implements ConstraintValidator<EmailOrPhoneNumber, String> {
    private static final PhoneNumberValidator phoneNumberValidator = new PhoneNumberValidator();
    private static final Pattern pattern = Pattern.compile("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$");

    @Override
    public boolean isValid(String s, ConstraintValidatorContext constraintValidatorContext) {
        return (phoneNumberValidator.isValid(s, constraintValidatorContext) ||
                (s != null &&pattern.matcher(s).matches()));
    }
}
