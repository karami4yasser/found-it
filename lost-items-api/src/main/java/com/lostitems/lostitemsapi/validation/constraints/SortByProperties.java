package com.lostitems.lostitemsapi.validation.constraints;

import com.lostitems.lostitemsapi.validation.SortByPropertiesValidator;
import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.Retention;
import java.lang.annotation.Target;

import static java.lang.annotation.ElementType.*;
import static java.lang.annotation.RetentionPolicy.RUNTIME;

@Target({ FIELD, PARAMETER, ANNOTATION_TYPE })
@Retention(RUNTIME)
@Constraint(validatedBy = SortByPropertiesValidator.class)
public @interface SortByProperties {
    String message() default "Invalid value in 'sortBy'";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};

    String[] allowableProperties() default {};
}