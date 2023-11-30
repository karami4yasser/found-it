package com.lostitems.lostitemsapi.validation;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

public class EmailOrPhoneNumberValidatorTest {
    private final EmailOrPhoneNumberValidator validator = new EmailOrPhoneNumberValidator();
    @Test
    void testEmailOrPhoneNumberValidator_phone_startWithZero() {
        assertTrue(validator.isValid("0655751802", null));
    }
    @Test
    void testEmailOrPhoneNumberValidator_phone_startWithTwoZeros() {
        assertTrue(validator.isValid("00212655741802", null));
    }
    @Test
    void testEmailOrPhoneNumberValidator_phone_startWithPlus() {
        assertTrue(validator.isValid("+212655741802", null));

    }
    @Test
    void testEmailOrPhoneNumberValidator_phone_containsCharacters() {
        assertFalse(validator.isValid("+21265ab41802", null));
    }
    @Test
    void testEmailOrPhoneNumberValidator_phone_isString() {
        assertFalse(validator.isValid("string", null));
    }

    @Test
    void testEmailOrPhoneNumberValidator_phone_doesNotStartWithTwoZerosOrPlus() {
        assertFalse(validator.isValid("2126532123241802", null));
    }
    @Test
    void testEmailOrPhoneNumberValidator_phone_isNull() {
        assertFalse(validator.isValid(null, null));
    }
    @Test
    void testEmailOrPhoneNumberValidator_phone_containsMoreThan15digits() {
        assertFalse(validator.isValid("+2126557418020000", null));
    }
    @Test
    void testEmailOrPhoneNumberValidator_email_doesNotContainAt() {
        assertFalse(validator.isValid("test.com", null));
    }
    @Test
    void testEmailOrPhoneNumberValidator_email_startsWithAt() {
        assertFalse(validator.isValid("@test.com", null));
    }
    @Test
    void testEmailOrPhoneNumberValidator_email_nothingAfterAt() {
        assertFalse(validator.isValid("test@", null));
    }
    @Test
    void testEmailOrPhoneNumberValidator_email_nothingBetweenAtAndDot() {
        assertFalse(validator.isValid("test@.com", null));
    }
    @Test
    void testEmailOrPhoneNumberValidator_email_lessThanTwoCharsAfterDot() {
        assertFalse(validator.isValid("test@test.c", null));
    }
    @Test
    void testEmailOrPhoneNumberValidator_email_noDot() {
        assertFalse(validator.isValid("test@testcom", null));
    }
    @Test
    void testEmailOrPhoneNumberValidator_email_valid() {
        assertTrue(validator.isValid("test@test.com", null));
    }
}
