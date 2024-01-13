package com.lostitems.lostitemsapi.utils;

import com.lostitems.lostitemsapi.exception.FoundItInvalidItemInputDataException;

public class PhoneUtils {
    public static final String[] phonePrefixes = {"+212", "0", "00212"}; // add more if necessary
    public static final String basePrefix = "+212"; // may be changed when necessary
    public static String normalizePhone(String phoneNumber) {
        for (String prefix: phonePrefixes) {
            if (phoneNumber.startsWith(prefix)) {
                return phoneNumber.substring(prefix.length());
            }
        }
        return phoneNumber;
    }
    public static String prefixPhone(String phoneNumber) {
        return basePrefix + phoneNumber;
    }
}
