package com.lostitems.lostitemsapi.validation;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.lostitems.lostitemsapi.validation.constraints.FoundItCategory;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import org.springframework.core.io.ClassPathResource;

import java.io.IOException;
import java.util.List;

public class FoundItCategoryValidator implements ConstraintValidator<FoundItCategory, String> {
    @Override
    public boolean isValid(String category, ConstraintValidatorContext constraintValidatorContext) {
        if (category == null) {
            return true;
        }
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            ClassPathResource resource = new ClassPathResource("assets/categories.json");
            List<String> categories = objectMapper.readValue(resource.getInputStream(), new TypeReference<>() {});
            return categories.contains(category);
        } catch (IOException e) {
            return false;
        }
    }
}
