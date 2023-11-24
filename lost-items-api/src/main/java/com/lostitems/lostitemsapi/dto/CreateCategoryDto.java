package com.lostitems.lostitemsapi.dto;

import com.lostitems.lostitemsapi.model.Category;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@NoArgsConstructor
public class CreateCategoryDto {
    @NotNull(message = "Category name should not be null !")
    @NotEmpty(message = "Category name should not be empty !")
    @Size(max = 25, message = "Category name should not exceed 25 !")
    private String name;
    private Category parentCategory;
}
