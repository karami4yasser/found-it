package com.lostitems.lostitemsapi.service;

import com.lostitems.lostitemsapi.dto.category.CreateCategoryDto;
import com.lostitems.lostitemsapi.exception.FoundItCategoryAlreadyExistException;
import com.lostitems.lostitemsapi.exception.FoundItCategoryNotFoundException;
import com.lostitems.lostitemsapi.model.Category;
import com.lostitems.lostitemsapi.utils.BaseTest;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.DEFINED_PORT)
@Transactional
public class CategoryServiceTest extends BaseTest {

    private final CategoryService categoryService;

    @Autowired
    public CategoryServiceTest(CategoryService categoryService) {
        this.categoryService = categoryService;
    }
    @Test
    void testCreateCategory_categoryAlreadyExists() {
        FoundItCategoryAlreadyExistException exception =
                assertThrows(FoundItCategoryAlreadyExistException.class, () -> {
                    categoryService.createCategory(new CreateCategoryDto(
                            "category",
                            null
                    ));
                });
        assertEquals("Category with name 'category' already exists", exception.getMessage());
    }

    @Test
    void testCreateCategory_correctValues() {
        assertDoesNotThrow(() -> categoryService.createCategory(new CreateCategoryDto(
                "category1",
                null
        )));
        assertDoesNotThrow(() -> {
            Category category = categoryService.findCategoryByName("category1");
            assertEquals("category1", category.getName());
            assertNull(category.getParentCategory());
        });
    }

    @Test
    void testCreateCategory_HasParent() {
        assertDoesNotThrow(() -> categoryService.createCategory(new CreateCategoryDto(
                "category2",
                 UUID.fromString("0ebacabc-83fa-11ee-b962-0242ac120002")
        )));

        Category category2=categoryService.findCategoryByName("category2");
        Category category=categoryService.findCategoryByName("category");

        assertTrue(category.getChildrenCategories().contains(category2));
    }

    @Test
    void testCreateCategory_ParentDoesNotExist() {
        UUID parentId = UUID.randomUUID();
        FoundItCategoryNotFoundException exception =
                assertThrows(FoundItCategoryNotFoundException.class, () -> {
                    categoryService.createCategory(new CreateCategoryDto(
                            "category",
                            parentId
                    ));
                });
        assertEquals("Category with id '"+parentId+"' not found", exception.getMessage());
    }
}
