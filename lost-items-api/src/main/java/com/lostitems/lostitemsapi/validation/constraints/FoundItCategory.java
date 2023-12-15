package com.lostitems.lostitemsapi.validation.constraints;

import com.lostitems.lostitemsapi.validation.FoundItCategoryValidator;
import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.Retention;
import java.lang.annotation.Target;

import static java.lang.annotation.ElementType.ANNOTATION_TYPE;
import static java.lang.annotation.ElementType.FIELD;
import static java.lang.annotation.ElementType.PARAMETER;
import static java.lang.annotation.ElementType.TYPE_USE;
import static java.lang.annotation.RetentionPolicy.RUNTIME;

@Target({ FIELD, PARAMETER, TYPE_USE, ANNOTATION_TYPE })
@Retention(RUNTIME)
@Constraint(validatedBy = FoundItCategoryValidator.class)
public @interface FoundItCategory {
    String message() default "Category not valid";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}
