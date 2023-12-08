package com.lostitems.lostitemsapi.controller;

import com.lostitems.lostitemsapi.dto.FoundItExceptionResponse;
import com.lostitems.lostitemsapi.dto.item.CreateItemRequestDto;
import com.lostitems.lostitemsapi.dto.item.ItemOverviewDto;
import com.lostitems.lostitemsapi.enumeration.ItemType;
import com.lostitems.lostitemsapi.exception.FoundItCategoryNotFoundException;
import com.lostitems.lostitemsapi.exception.FoundItInvalidItemInputDataException;
import com.lostitems.lostitemsapi.exception.FoundItNotPremiumException;
import com.lostitems.lostitemsapi.service.ItemService;
import com.lostitems.lostitemsapi.utils.JwtTestUtils;
import io.restassured.http.ContentType;
import io.restassured.http.Header;
import io.restassured.response.Response;
import lombok.RequiredArgsConstructor;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static io.restassured.RestAssured.given;
import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.DEFINED_PORT)
public class ItemControllerTest extends BaseControllerTest {

    private final ItemService itemService;

    @Autowired
    public ItemControllerTest(ItemService itemService) {
        this.itemService = itemService;
    }

    private final String ITEM_CONTEXT_PATH = CONTEXT_PATH + "/items";

    @Test
    void testGetItems_AllItems() {
        ItemOverviewDto[] response = given()
                .when()
                .get(ITEM_CONTEXT_PATH)
                .then()
                .statusCode(200)
                .and()
                .extract()
                .response()
                .body().as(ItemOverviewDto[].class);
        assertEquals(4, response.length);

        // assert to check if the items are sorted by postDate
        assertEquals(response[0].type(), ItemType.LOST);
        assertEquals(response[0].title(), "This item is lost casa");
    }

    @Test
    void testGetItems_AllItems_FilteredBy_Type() {
        ItemOverviewDto[] response = given()
                .when()
                .queryParam("type", ItemType.FOUND.name())
                .get(ITEM_CONTEXT_PATH)
                .then()
                .statusCode(200)
                .and()
                .extract()
                .response()
                .body().as(ItemOverviewDto[].class);
        assertEquals(response.length,1);
        assertEquals(response[0].type(), ItemType.FOUND);
        assertEquals(response[0].title(), "this titles contains the name POWERFUL");
        assertEquals(response[0].id(), UUID.fromString("0ebacabc-83fa-11ee-b962-0242ac120001"));
    }

    @Test
    void testGetItems_AllItems_FilteredBy_Type_Returned() {
        ItemOverviewDto[] response = given()
                .when()
                .queryParam("type", ItemType.LOST.name())
                .queryParam("returned", Boolean.TRUE)
                .get(ITEM_CONTEXT_PATH)
                .then()
                .statusCode(200)
                .and()
                .extract()
                .response()
                .body()
                .as(ItemOverviewDto[].class);
        assertEquals(response.length,0);
    }

    @Test
    public void testCreateItem_rangeMoreThanAllowed() {
        CreateItemRequestDto requestBody = new CreateItemRequestDto(
                null,
                null,
                null,
                ItemType.FOUND,
                "test",
                "test",
                33.533845,
                -7.648460,
                210.0
        );

        Response response =
                given()
                        .when()
                        .header(new Header("Authorization", JwtTestUtils.DUMMY_TOKEN))
                        .body(requestBody)
                        .contentType(ContentType.JSON)
                        .post(ITEM_CONTEXT_PATH)
                        .then()
                        .statusCode(403)
                        .and()
                        .extract()
                        .response();

        assertEquals("User is not premium", response.jsonPath().getString("message"));
    }

    @Test
    public void testCreateItem_categoryDoesNotExist() {
        CreateItemRequestDto requestBody = new CreateItemRequestDto(
                null,
                "non existent category",
                null,
                ItemType.FOUND,
                "test",
                "test",
                33.533845,
                -7.648460,
                150.0
        );

        Response response =
                given()
                        .when()
                        .header(new Header("Authorization", JwtTestUtils.DUMMY_TOKEN))
                        .body(requestBody)
                        .contentType(ContentType.JSON)
                        .post(ITEM_CONTEXT_PATH)
                        .then()
                        .statusCode(404)
                        .and()
                        .extract()
                        .response();

        assertEquals("Category with name 'non existent category' not found", response.jsonPath().getString("message"));
    }

    @Test
    public void testCreateItem_invalidLatitude() {
        CreateItemRequestDto requestBody = new CreateItemRequestDto(
                null,
                null,
                null,
                ItemType.FOUND,
                "test",
                "test",
                100,
                -100,
                150.0
        );

        Response response =
                given()
                        .when()
                        .header(new Header("Authorization", JwtTestUtils.DUMMY_TOKEN))
                        .body(requestBody)
                        .contentType(ContentType.JSON)
                        .post(ITEM_CONTEXT_PATH)
                        .then()
                        .statusCode(400)
                        .and()
                        .extract()
                        .response();

        assertEquals("Input data is not valid : Latitude is not valid", response.jsonPath().getString("message"));
    }

    @Test
    public void testCreateItem_invalidLongitude() {
        CreateItemRequestDto requestBody = new CreateItemRequestDto(
                null,
                null,
                null,
                ItemType.FOUND,
                "test",
                "test",
                190,
                -5,
                150.0
        );

        Response response =
                given()
                        .when()
                        .header(new Header("Authorization", JwtTestUtils.DUMMY_TOKEN))
                        .body(requestBody)
                        .contentType(ContentType.JSON)
                        .post(ITEM_CONTEXT_PATH)
                        .then()
                        .statusCode(400)
                        .and()
                        .extract()
                        .response();

        assertEquals("Input data is not valid : Longitude is not valid", response.jsonPath().getString("message"));
    }

    @Test
    public void testCreateItem_validValues() {
        CreateItemRequestDto requestBody = new CreateItemRequestDto(
                LocalDate.of(2021, 1, 1),
                "categoryItem",
                null,
                ItemType.LOST,
                "test",
                "test",
                100,
                -5,
                150.0
        );

        Response response =
                given()
                        .when()
                        .header(new Header("Authorization", JwtTestUtils.DUMMY_TOKEN))
                        .body(requestBody)
                        .contentType(ContentType.JSON)
                        .post(ITEM_CONTEXT_PATH)
                        .then()
                        .statusCode(201)
                        .and()
                        .extract()
                        .response();


        List<ItemOverviewDto> items = itemService.getItems(
                Optional.empty(),
                Optional.of(ItemType.LOST),
                Optional.of("test"),
                Optional.empty(),
                Optional.empty(),
                Optional.empty(),
                Optional.empty(),
                Optional.empty(),
                Optional.empty()
        );

        assertEquals(1, items.size());
        assertEquals("test", items.get(0).title());
        assertEquals(LocalDate.of(2021, 1, 1), items.get(0).date());

        assertEquals(CONTEXT_PATH + "/items/" + items.get(0).id(), response.getHeader("Location"));

        // cleanup in order to not affect other tests
        itemService.deleteItem(items.get(0).id());
    }

}