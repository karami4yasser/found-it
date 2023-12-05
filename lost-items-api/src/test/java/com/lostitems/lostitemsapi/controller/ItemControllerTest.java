package com.lostitems.lostitemsapi.controller;

import com.lostitems.lostitemsapi.enumeration.ItemType;
import com.lostitems.lostitemsapi.service.ItemService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static io.restassured.RestAssured.given;
import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.DEFINED_PORT)
public class ItemControllerTest extends BaseControllerTest {

    private final String Item_CONTEXT_PATH = CONTEXT_PATH + "/items";

    @Test
    void testGetItems_AllItems() {
        List response = given()
                .when()
                .get(Item_CONTEXT_PATH)
                .then()
                .statusCode(200)
                .and()
                .extract()
                .response()
                .body().as(List.class);
        assertEquals(response.size(),3);
    }

    @Test
    void testGetItems_AllItems_FilteredBy_Type() {
        List response = given()
                .when()
                .queryParam("type", ItemType.FOUND.name())
                .get(Item_CONTEXT_PATH)
                .then()
                .statusCode(200)
                .and()
                .extract()
                .response()
                .body().as(List.class);
        assertEquals(response.size(),1);
    }

    @Test
    void testGetItems_AllItems_FilteredBy_Type_Returned() {
        List response = given()
                .when()
                .queryParam("type", ItemType.LOST.name())
                .queryParam("returned", Boolean.TRUE)
                .get(Item_CONTEXT_PATH)
                .then()
                .statusCode(200)
                .and()
                .extract()
                .response()
                .body().as(List.class);
        assertEquals(response.size(),0);
    }

}