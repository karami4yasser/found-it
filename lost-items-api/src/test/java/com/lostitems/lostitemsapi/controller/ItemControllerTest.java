package com.lostitems.lostitemsapi.controller;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.lostitems.lostitemsapi.dto.item.CreateItemRequestDto;
import com.lostitems.lostitemsapi.dto.item.ItemOverviewCollection;
import com.lostitems.lostitemsapi.enumeration.ItemType;
import com.lostitems.lostitemsapi.service.ItemService;
import com.lostitems.lostitemsapi.utils.JwtTestUtils;
import com.lostitems.lostitemsapi.utils.OffsetBasedPageRequest;
import io.restassured.http.ContentType;
import io.restassured.http.Header;
import io.restassured.response.Response;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.core.io.ClassPathResource;
import org.springframework.data.domain.Sort;

import java.io.IOException;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static io.restassured.RestAssured.given;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

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
        ItemOverviewCollection response = given()
                .when()
                .get(ITEM_CONTEXT_PATH)
                .then()
                .statusCode(200)
                .and()
                .extract()
                .response()
                .body().as(ItemOverviewCollection.class);
        assertEquals(4, response.totalResults);

        // assert to check if the items are sorted by postDate
        assertEquals(response.items.get(0).type(), ItemType.LOST);
        assertEquals(response.items.get(0).title(), "This item is lost casa");
    }

    @Test
    void testGetItems_AllItems_FilteredBy_Type() {
        ItemOverviewCollection response = given()
                .when()
                .queryParam("type", ItemType.FOUND.name())
                .get(ITEM_CONTEXT_PATH)
                .then()
                .statusCode(200)
                .and()
                .extract()
                .response()
                .body().as(ItemOverviewCollection.class);
        assertEquals(response.totalResults,1);
        assertEquals(response.items.get(0).type(), ItemType.FOUND);
        assertEquals(response.items.get(0).title(), "this titles contains the name POWERFUL");
        assertEquals(response.items.get(0).id(), UUID.fromString("0ebacabc-83fa-11ee-b962-0242ac120001"));
    }

    @Test
    void testGetItems_AllItems_FilteredBy_Type_Returned() {
        ItemOverviewCollection response = given()
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
                .as(ItemOverviewCollection.class);
        assertEquals(0,response.totalResults);
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
    public void testCreateItem_invalidLatitude() {
        CreateItemRequestDto requestBody = new CreateItemRequestDto(
                null,
                null,
                null,
                ItemType.FOUND,
                "test",
                "test",
                100.0,
                -100.0,
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
                190.0,
                -5.0,
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
                "Electronics",
                null,
                ItemType.LOST,
                "test",
                "test",
                100.0,
                -5.0,
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


        ItemOverviewCollection items = itemService.getItems(
                Optional.empty(),
                Optional.of(ItemType.LOST),
                Optional.of("test"),
                Optional.empty(),
                Optional.empty(),
                Optional.empty(),
                Optional.empty(),
                Optional.empty(),
                Optional.empty(),
                Optional.empty(),
                new OffsetBasedPageRequest(0, 1, Sort.by(Sort.Direction.DESC, "postDate"))
        );

        assertEquals(1, items.totalResults);
        assertEquals("test", items.items.get(0).title());
        assertEquals(LocalDate.of(2021, 1, 1), items.items.get(0).date());

        assertEquals(CONTEXT_PATH + "/items/" + items.items.get(0).id(), response.getHeader("Location"));

        // cleanup in order to not affect other tests
        itemService.deleteItem(items.items.get(0).id());
    }

    @Test
    public void testCreateItem_invalidCategory() {
        CreateItemRequestDto requestBody = new CreateItemRequestDto(
                null,
                "not valid",
                null,
                ItemType.FOUND,
                "test",
                "test",
                190.0,
                -5.0,
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

        List<String> errors = response.jsonPath().getList("errors", String.class);
        assertEquals(1, errors.size());
        assertEquals("Category not valid", errors.get(0));
    }

    @Test
    public void testGetCategories() throws IOException {
        Response response =
                given()
                        .when()
                        .get(ITEM_CONTEXT_PATH + "/categories")
                        .then()
                        .statusCode(200)
                        .and()
                        .extract()
                        .response();
        ObjectMapper objectMapper = new ObjectMapper();
        ClassPathResource resource = new ClassPathResource("assets/categories.json");
        List<String> expectedCategories = objectMapper.readValue(resource.getInputStream(), new TypeReference<>() {});
        List<String> actualCategories = response.jsonPath().getList("", String.class);
        assertEquals(expectedCategories.size(), actualCategories.size());
        assertTrue(expectedCategories.containsAll(actualCategories));
        assertTrue(actualCategories.containsAll(expectedCategories));
    }

}