package com.lostitems.lostitemsapi.service;


import com.lostitems.lostitemsapi.dto.item.CreateItemRequestDto;
import com.lostitems.lostitemsapi.dto.item.ItemDetailsDto;
import com.lostitems.lostitemsapi.dto.item.ItemOverviewCollection;
import com.lostitems.lostitemsapi.enumeration.ItemType;
import com.lostitems.lostitemsapi.exception.FoundItInvalidItemInputDataException;
import com.lostitems.lostitemsapi.exception.FoundItItemNotFoundException;
import com.lostitems.lostitemsapi.exception.FoundItNotPremiumException;
import com.lostitems.lostitemsapi.utils.BaseTest;
import com.lostitems.lostitemsapi.utils.JwtTestUtils;
import com.lostitems.lostitemsapi.utils.OffsetBasedPageRequest;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Sort;

import java.time.LocalDate;
import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.DEFINED_PORT)
public class ItemServiceTest extends BaseTest {


    @Autowired
    private ItemService itemService;

    @Test
    void itemServiceTest_getItems_AllItems() {
        ItemOverviewCollection items = itemService.getItems(
                Optional.empty(),
                Optional.empty(),
                Optional.empty(),
                Optional.empty(),
                Optional.empty(),
                Optional.empty(),
                Optional.empty(),
                Optional.empty(),
                Optional.empty(),
                Optional.empty(),
                Optional.empty(),
                new OffsetBasedPageRequest(0, 10, Sort.by(Sort.Direction.DESC, "postDate"))
        );
        assertEquals(4, items.totalResults);
    }

    @Test
    void itemServiceTest_getItems_FilterByType() {
        ItemOverviewCollection items = itemService.getItems(
                Optional.empty(),
                Optional.of(ItemType.FOUND),
                Optional.empty(),
                Optional.empty(),
                Optional.empty(),
                Optional.empty(),
                Optional.empty(),
                Optional.empty(),
                Optional.empty(),
                Optional.empty(),
                Optional.empty(),
                new OffsetBasedPageRequest(0, 10, Sort.by(Sort.Direction.DESC, "postDate"))
        );
        assertEquals(1,items.totalResults);
    }

    @Test
    void itemServiceTest_getItems_FilterByTypeAndTextContain() {
        ItemOverviewCollection items = itemService.getItems(
                Optional.empty(),
                Optional.of(ItemType.FOUND),
                Optional.of("I_DO_NOT_EXIST"),
                Optional.empty(),
                Optional.empty(),
                Optional.empty(),
                Optional.empty(),
                Optional.empty(),
                Optional.empty(),
                Optional.empty(),
                Optional.empty(),
                new OffsetBasedPageRequest(0, 10, Sort.by(Sort.Direction.DESC, "postDate"))
        );
        assertEquals(0,items.totalResults);
    }

    @Test
    void itemServiceTest_getItems_rangeNotReached() {
        ItemOverviewCollection items = itemService.getItems(
                Optional.empty(),
                Optional.empty(),
                Optional.empty(),
                Optional.empty(),
                Optional.empty(),
                Optional.of(33.533845),
                Optional.of(-7.648460),
                Optional.of(200.0),
                Optional.empty(),
                Optional.empty(),
                Optional.empty(),
                new OffsetBasedPageRequest(0, 10, Sort.by(Sort.Direction.DESC, "postDate"))
        );
        assertEquals(0, items.totalResults);
    }

    @Test
    void itemServiceTest_getItems_rangeReached() {
        ItemOverviewCollection items = itemService.getItems(
                Optional.empty(),
                Optional.empty(),
                Optional.empty(),
                Optional.empty(),
                Optional.empty(),
                Optional.of(33.533845),
                Optional.of(-7.648460),
                Optional.of(210.0),
                Optional.empty(),
                Optional.empty(),
                Optional.empty(),
                new OffsetBasedPageRequest(0, 10, Sort.by(Sort.Direction.DESC, "postDate"))
        );
        assertEquals(1, items.totalResults);
        assertEquals(UUID.fromString("a09959e6-9451-11ee-b9d1-0242ac120002"), items.items.get(0).id());
    }

    @Test
    public void testCreateItem_rangeMoreThanAllowed() {
        assertThrows(FoundItNotPremiumException.class, () -> {
            itemService.createItem(
                    new CreateItemRequestDto(
                            null,
                            null,
                            null,
                            ItemType.FOUND,
                            "test",
                            "test",
                            33.533845,
                            -7.648460,
                            210.0
                    ),
                    JwtTestUtils.DUMMY_TOKEN
            );
        });
    }

    @Test
    public void testCreateItem_invalidLatitude() {
        FoundItInvalidItemInputDataException exception = assertThrows(FoundItInvalidItemInputDataException.class, () -> {
            itemService.createItem(
                    new CreateItemRequestDto(
                            null,
                            null,
                            null,
                            ItemType.FOUND,
                            "test",
                            "test",
                            100.0,
                            -100.0,
                            150.0
                    ),
                    JwtTestUtils.DUMMY_TOKEN
            );
        });

        assertEquals("Input data is not valid : Latitude is not valid", exception.getMessage());
    }

    @Test
    public void testCreateItem_invalidLongitude() {
        FoundItInvalidItemInputDataException exception = assertThrows(FoundItInvalidItemInputDataException.class, () -> {
            itemService.createItem(
                    new CreateItemRequestDto(
                            null,
                            null,
                            null,
                            ItemType.FOUND,
                            "test",
                            "test",
                            190.0,
                            -5.0,
                            150.0
                    ),
                    JwtTestUtils.DUMMY_TOKEN
            );
        });

        assertEquals("Input data is not valid : Longitude is not valid", exception.getMessage());
    }

    @Test
    public void testCreateItem_validValues() {
        assertDoesNotThrow(() -> {
            itemService.createItem(
                    new CreateItemRequestDto(
                            LocalDate.of(2021, 1, 1),
                            "Electronics",
                            null,
                            ItemType.LOST,
                            "test",
                            "test",
                            100.0,
                            -5.0,
                            150.0
                    ),
                    JwtTestUtils.DUMMY_TOKEN
            );

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
                    Optional.empty(),
                    new OffsetBasedPageRequest(0, 10, Sort.by(Sort.Direction.DESC, "postDate"))
            );

            assertEquals(1, items.totalResults);
            assertEquals("test", items.items.get(0).title());
            assertEquals(LocalDate.of(2021, 1, 1), items.items.get(0).date());

            // cleanup in order to not affect other tests
            itemService.deleteItem(items.items.get(0).id());
        });
    }

    @Test
    void itemServiceTest_getItem_Exist() {
        ItemDetailsDto itemDetailsDto = itemService.getItem(UUID.fromString("0ebacabc-83fa-11ee-b962-0242ac120001"));
        assertEquals("userXf userXl",itemDetailsDto.getPosterFullName());
        assertEquals("+212602394387",itemDetailsDto.getPosterPhoneNumber());
        assertEquals("0ebacabc-83fa-11ee-b962-0242ac120001",itemDetailsDto.getId().toString());
    }

    @Test
    void itemServiceTest_getItem_Not_Exist() {
        FoundItItemNotFoundException exception = assertThrows(FoundItItemNotFoundException.class,()-> {
            itemService.getItem(UUID.randomUUID());
        });

        assertEquals("Item was not found",exception.getMessage());
    }

    @Test
    void itemServiceTest_getItems_userId() {
        ItemOverviewCollection items = itemService.getItems(
                Optional.empty(),
                Optional.empty(),
                Optional.empty(),
                Optional.empty(),
                Optional.empty(),
                Optional.empty(),
                Optional.empty(),
                Optional.empty(),
                Optional.empty(),
                Optional.empty(),
                Optional.of(UUID.fromString("0ebacabc-83fa-11ee-b962-0242ac120002")),
                new OffsetBasedPageRequest(0, 10, Sort.by(Sort.Direction.DESC, "postDate"))
        );
        assertEquals(4, items.totalResults);
    }
}
