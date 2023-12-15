package com.lostitems.lostitemsapi.validation;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

public class FoundItCategoryValidatorTest {

    FoundItCategoryValidator categoryValidator = new FoundItCategoryValidator();

    @Test
    public void testFoundItCategoryValidation_correctValue() {
        assertTrue(categoryValidator.isValid("Electronics", null));
    }

    @Test
    public void testFoundItCategoryValidation_notValid() {
        assertFalse(categoryValidator.isValid("randome category", null));
    }
}
