package com.lostitems.lostitemsapi.mapper;


import com.lostitems.lostitemsapi.dto.category.CategoryDetailsDto;
import com.lostitems.lostitemsapi.dto.category.CreateCategoryDto;
import com.lostitems.lostitemsapi.model.Category;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface CategoryMapper {
    Category createCategoryDtoToCategory(CreateCategoryDto dto);
    CategoryDetailsDto categoryToCategoryDetailsDto(Category category);
}
