package com.lostitems.lostitemsapi.service;

import com.lostitems.lostitemsapi.dto.category.CreateCategoryDto;
import com.lostitems.lostitemsapi.exception.FoundItCategoryAlreadyExistException;
import com.lostitems.lostitemsapi.exception.FoundItCategoryNotFoundException;
import com.lostitems.lostitemsapi.mapper.CategoryMapper;
import com.lostitems.lostitemsapi.model.Category;
import com.lostitems.lostitemsapi.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@Lazy
@Transactional
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

    public void createCategory(CreateCategoryDto createCategoryDto) {
        checkCategoryDoesNotExists(createCategoryDto.name(),createCategoryDto.parentCategoryId());
        Category category =  categoryMapper.createCategoryDtoToCategory(createCategoryDto);
        if (createCategoryDto.parentCategoryId() != null)
        {
            Category parent = findCategoryById(createCategoryDto.parentCategoryId());
            category.setParentCategory(parent);
        }
        categoryRepository.save(category);
    }

    public Category findCategoryByName(String name){
        return categoryRepository.findCategoryByName(name).orElseThrow(
                () -> new FoundItCategoryNotFoundException(name)
        );
    }

    public Category findCategoryById(UUID id){
        return categoryRepository.findById(id).orElseThrow(
                () -> new FoundItCategoryNotFoundException(id)
        );
    }

    public void checkCategoryDoesNotExists(String categoryName,UUID parentId) {
        if (parentId == null)
        {
            if (categoryRepository.categoryExistsByNameAndParentIsNull(categoryName)) {
                throw new FoundItCategoryAlreadyExistException(categoryName);
            }
        }
        else {
            if (categoryRepository.categoryExistsByNameAndParent(categoryName,parentId)) {
                throw new FoundItCategoryAlreadyExistException(categoryName);
            }
        }

    }


}
