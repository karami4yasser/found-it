package com.lostitems.lostitemsapi.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.lostitems.lostitemsapi.utils.BaseTest;
import io.restassured.RestAssured;


public class BaseControllerTest extends BaseTest {
    protected final String CONTEXT_PATH = "/api";

    static {
        RestAssured.baseURI = "http://127.0.0.1";
        RestAssured.port = 8400;
    }
}
