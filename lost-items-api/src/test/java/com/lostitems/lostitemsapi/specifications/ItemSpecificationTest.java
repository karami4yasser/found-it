package com.lostitems.lostitemsapi.specifications;

import com.lostitems.lostitemsapi.enumeration.ItemType;
import com.lostitems.lostitemsapi.model.Category;
import com.lostitems.lostitemsapi.model.Item;
import com.lostitems.lostitemsapi.repository.CategoryRepository;
import com.lostitems.lostitemsapi.repository.ItemRepository;
import com.lostitems.lostitemsapi.repository.specification.ItemSpecifications;
import com.lostitems.lostitemsapi.utils.BaseTest;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertEquals;
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.DEFINED_PORT)
public class ItemSpecificationTest extends BaseTest {
    @Autowired
    private ItemRepository itemRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private ItemSpecifications itemSpecifications;


    @Test
    void itemSpecificationTest_FindItemsByTitle_Exist() {
       List<Item> itemsTitleContainsExist = itemRepository.findAll(itemSpecifications.titleContainsFilter("POWERFUL",false));
       assertEquals(1, itemsTitleContainsExist.size());
       assertEquals("this titles contains the name POWERFUL",itemsTitleContainsExist.get(0).getTitle());

    }
    @Test
    void itemSpecificationTest_FindItemsByTitle_Not_Exist() {
        List<Item> itemsTitleContainsNotExist = itemRepository.findAll(itemSpecifications.titleContainsFilter("WEAK",false));
        assertEquals(0, itemsTitleContainsNotExist.size());

    }


    @Test
    void itemSpecificationTest_FindItemsByDescription_Exist() {
        List<Item> itemsDescriptionContainsExist = itemRepository.findAll(itemSpecifications.descriptionContainsFilter("WEAK",false));
        assertEquals(1, itemsDescriptionContainsExist.size());
        assertEquals("this description contains the WEAK",itemsDescriptionContainsExist.get(0).getDescription());

    }
    @Test
    void itemSpecificationTest_FindItemsByDescription_Not_Exist() {
        List<Item> itemsDescriptionContainsNotExist = itemRepository.findAll(itemSpecifications.descriptionContainsFilter("POWERFUL",false));
        assertEquals(0, itemsDescriptionContainsNotExist.size());

    }


    @Test
    void itemSpecificationTest_FindItemsByText_Exist() {
        List<Item> itemsTextContainsExistInDescription = itemRepository.findAll(itemSpecifications.itemsTextContains(Optional.of("WEAK"),false));
        List<Item> itemsTextContainsExistInTitle = itemRepository.findAll(itemSpecifications.itemsTextContains(Optional.of("POWERFUL"),false));
        assertEquals(1, itemsTextContainsExistInDescription.size());
        assertEquals(1, itemsTextContainsExistInTitle.size());

    }



    @Test
    void itemSpecificationTest_FindItemsByType() {
        List<Item> itemsTypeLost = itemRepository.findAll(itemSpecifications.typeFilter(Optional.of(ItemType.FOUND)));
        assertEquals(1, itemsTypeLost.size());
    }


    @Test
    void itemSpecificationTest_FindItemsByCategory_Exist() {
        Optional<Category> category = categoryRepository.findById(UUID.fromString("0ebacabc-83fa-11ee-b962-0242ac120012"));
        List<Item> itemsTypeLost = itemRepository.findAll(itemSpecifications.categoryFilter(category));
        assertEquals(1, itemsTypeLost.size());
    }


    @Test
    void itemSpecificationTest_FindItemsByLocation() {
        Optional<Double> latitude = Optional.of(35.7595);
        Optional<Double> longitude = Optional.of(5.8340);
        Optional<Double> distance = Optional.of(0.0);
        List<Item> itemsNearTangier = itemRepository.findAll(itemSpecifications.nearLocation(latitude,longitude, distance));
        assertEquals(1, itemsNearTangier.size());
        assertEquals(itemsNearTangier.get(0).getId(), UUID.fromString("0ebacabc-83fa-11ee-b962-0242ac120005"));
    }

    @Test
    void itemSpecificationTest_FindItemsByDateRange_EXIST() {
        List<Item> itemsByDateRange = itemRepository.findAll(itemSpecifications.timeFilter(Optional.of(LocalDate.of(2022, 7, 20)),Optional.of(LocalDate.of(2022, 7, 27))));
        assertEquals(1, itemsByDateRange.size());
    }

    @Test
    void itemSpecificationTest_FindItemsByDateRange_Not_Exist() {
        List<Item> itemsByDateRange = itemRepository.findAll(itemSpecifications.timeFilter(Optional.of(LocalDate.of(1999, 7, 20)),Optional.of(LocalDate.of(2000, 7, 27))));
        assertEquals(0, itemsByDateRange.size());
    }

    @Test
    void itemSpecificationTest_FindItemsByReturned() {
        List<Item> itemsByByReturned = itemRepository.findAll(itemSpecifications.isReturned(Optional.of(Boolean.TRUE)));
        assertEquals(1, itemsByByReturned.size());
    }
}

