package com.lostitems.lostitemsapi.security;

public class JwtAuthUtils {
    public static final String SECRET = "1Gwe@5Xv#LpTBTD9x[)2Ws8GkTb\"9/0h6x~0^MB0wg7JHRx\\!\\aP:lih6Bj%6u*t";
    public static final long ACCESS_TOKEN_EXPIRATION_TIME = 60 * 10; // in seconds
    public static final long REFRESH_TOKEN_EXPIRATION_TIME = 2 * 24 * 60 * 60; // in seconds
}