package com.lostitems.lostitemsapi.service;

import com.lostitems.lostitemsapi.dto.CategoryDetailsDto;
import com.lostitems.lostitemsapi.dto.CreateCategoryDto;
import com.lostitems.lostitemsapi.exception.CategoryNotFoundException;
import com.lostitems.lostitemsapi.mapper.CategoryMapper;
import com.lostitems.lostitemsapi.model.Category;
import com.lostitems.lostitemsapi.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@Lazy
public class CategoryService {

    private final CategoryRepository categoryRepository;
    private final CategoryMapper categoryMapper;

    @Lazy
    @Autowired
    public CategoryService(
            CategoryRepository categoryRepository,
            CategoryMapper categoryMapper
    ) {
        this.categoryRepository=categoryRepository;
        this.categoryMapper=categoryMapper;
    }

    public Category CreateCategory(CreateCategoryDto addCategoryDetails) {
        Category category =  categoryMapper.createCategoryDtoToCategory(addCategoryDetails);
        return categoryRepository.save(category);
    }

    public List<Category> getCategories(){
        return categoryRepository.findAll();
    }

    public CategoryDetailsDto getCategoryById(UUID id){
        return categoryMapper.categoryToCategoryDetailsDto(
                categoryRepository.findById(id).orElseThrow(
                        () -> new CategoryNotFoundException(id)
                )
        );
    }

}
