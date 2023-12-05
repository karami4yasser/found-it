package com.lostitems.lostitemsapi.service;


import com.lostitems.lostitemsapi.dto.item.ItemOverviewDto;
import com.lostitems.lostitemsapi.enumeration.ItemType;
import com.lostitems.lostitemsapi.exception.FoundItCategoryNotFoundException;
import com.lostitems.lostitemsapi.utils.BaseTest;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.DEFINED_PORT)
public class ItemServiceTest extends BaseTest {


    @Autowired
    private ItemService itemService;

    @Test
    void itemServiceTest_getItems_AllItems() {
        List<ItemOverviewDto> items = itemService.getItems(
                Optional.empty(),
                Optional.empty(),
                Optional.empty(),
                Optional.empty(),
                Optional.empty(),
                Optional.empty(),
                Optional.empty(),
                Optional.empty(),
                Optional.empty()
        );
        assertEquals(3,items.size());
    }

    @Test
    void itemServiceTest_getItems_FilterByType() {
        List<ItemOverviewDto> items = itemService.getItems(
                Optional.empty(),
                Optional.of(ItemType.FOUND),
                Optional.empty(),
                Optional.empty(),
                Optional.empty(),
                Optional.empty(),
                Optional.empty(),
                Optional.empty(),
                Optional.empty()
        );
        assertEquals(1,items.size());
    }

    @Test
    void itemServiceTest_getItems_FilterByTypeAndTextContain() {
        List<ItemOverviewDto> items = itemService.getItems(
                Optional.empty(),
                Optional.of(ItemType.FOUND),
                Optional.of("I_DO_NOT_EXIST"),
                Optional.empty(),
                Optional.empty(),
                Optional.empty(),
                Optional.empty(),
                Optional.empty(),
                Optional.empty()
        );
        assertEquals(0,items.size());
    }

    @Test
    void itemServiceTest_getItems_CategoryDoesNotExist() {
        UUID random =UUID.randomUUID();
        FoundItCategoryNotFoundException exception =
                assertThrows(
                        FoundItCategoryNotFoundException.class, () -> {
                            itemService.getItems(
                                    Optional.of(random),
                                    Optional.empty(),
                                    Optional.empty(),
                                    Optional.empty(),
                                    Optional.empty(),
                                    Optional.empty(),
                                    Optional.empty(),
                                    Optional.empty(),
                                    Optional.empty()
                            );
                        });
        assertEquals("Category with id "+random+" not found",exception.getMessage());
    }

}
