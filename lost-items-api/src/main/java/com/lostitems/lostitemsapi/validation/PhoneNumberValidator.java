package com.lostitems.lostitemsapi.validation;

import com.lostitems.lostitemsapi.validation.constraints.PhoneNumber;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class PhoneNumberValidator implements ConstraintValidator<PhoneNumber, String> {

    @Override
    public boolean isValid(String s, ConstraintValidatorContext constraintValidatorContext) {
        if (s == null) {
            return false;
        }
        Pattern p = Pattern.compile(
                "^(00\\d{1,3}( )?|\\+\\d{1,3}( )?)?((\\(\\d{1,3}\\))|\\d{1,3})[- .]?\\d{3,4}[- .]?\\d{4}$"
        );

        Matcher m = p.matcher(s);
        return (m.matches());
    }
}
