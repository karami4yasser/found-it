package com.lostitems.lostitemsapi.validation;

import com.google.common.collect.Sets;
import com.lostitems.lostitemsapi.validation.constraints.SortByProperties;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import java.util.Arrays;
import java.util.Set;

public class SortByPropertiesValidator implements ConstraintValidator<SortByProperties, String[]> {

    private Set<String> allowableProperties;

    @Override
    public void initialize(SortByProperties constraint) {
        allowableProperties = Sets.newHashSet(constraint.allowableProperties());
    }

    @Override
    public boolean isValid(String[] properties, ConstraintValidatorContext constraintValidatorContext) {
        return Arrays.stream(properties).allMatch(property -> allowableProperties.contains(property));
    }
}
