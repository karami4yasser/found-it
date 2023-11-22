package com.lostitems.lostitemsapi.validation;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

public class PhoneNumberValidatorTest {
    private final PhoneNumberValidator validator = new PhoneNumberValidator();
    @Test
    void testPhoneNumberValidator_startWithZero() {
        assertEquals(validator.isValid("0655751802", null),true);
    }
    @Test
    void testPhoneNumberValidator_startWithTwoZeros() {
        assertEquals(validator.isValid("00212655741802", null),true);
    }
    @Test
    void testPhoneNumberValidator_startWithPlus() {
        assertEquals(validator.isValid("+212655741802", null),true);

    }

    @Test
    void testPhoneNumberValidator_containsCharacters() {
        assertEquals(validator.isValid("+21265ab41802", null),false);
    }

    @Test
    void testPhoneNumberValidator_isString() {
        assertEquals(validator.isValid("string", null),false);
    }

    @Test
    void testPhoneNumberValidator_doesNotStartWithTwoZerosOrPlus() {
        assertEquals(validator.isValid("2126532123241802", null),false);
    }

    @Test
    void testPhoneNumberValidator_isNull() {

        assertEquals(validator.isValid(null, null),false);
    }

    @Test
    void testPhoneNumberValidator_containsMoreThan15digits() {
        assertEquals(validator.isValid("+2126557418020000", null),false);
    }
}
