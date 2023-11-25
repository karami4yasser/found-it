package com.lostitems.lostitemsapi.service;

import com.lostitems.lostitemsapi.dto.category.CategoryDetailsDto;
import com.lostitems.lostitemsapi.dto.category.CreateCategoryDto;
import com.lostitems.lostitemsapi.mapper.CategoryMapper;
import com.lostitems.lostitemsapi.model.Category;
import com.lostitems.lostitemsapi.repository.CategoryRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Spy;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.Optional;
import java.util.UUID;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(SpringExtension.class)
public class CategoryServiceTest {

    @Mock
    CategoryRepository categoryRepository;

    @Mock
    CategoryMapper categoryMapper;
    @Spy
    @InjectMocks
    CategoryService categoryService;

    @Test
    void testCreateCategory() {
        Category category = mock(Category.class);

        when(categoryMapper.createCategoryDtoToCategory(any(CreateCategoryDto.class))).thenReturn(category);
        when(categoryRepository.save(any(Category.class))).thenReturn(category);

        categoryService.createCategory(mock(CreateCategoryDto.class));

        // category saved
        verify(categoryRepository).save(any(Category.class));

    }

    @Test
    void testGetCategories() {
        categoryService.getCategories();

        verify(categoryRepository).findAll();
    }

    @Test
    void testGetCategoryById() {
        Category category = new Category();
        UUID uuid = new UUID(123L,123L);
        category.setId(uuid);
        when(categoryMapper.categoryToCategoryDetailsDto(any(Category.class))).thenReturn(mock(CategoryDetailsDto.class));
        when(categoryRepository.findById(any(UUID.class))).thenReturn(Optional.of(category));
        categoryService.getCategoryById(uuid);
        verify(categoryRepository).findById(uuid);
    }
}
