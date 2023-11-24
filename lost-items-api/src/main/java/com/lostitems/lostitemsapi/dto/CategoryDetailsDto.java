package com.lostitems.lostitemsapi.dto;

import com.lostitems.lostitemsapi.model.Category;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
public class CategoryDetailsDto {
    private UUID id;
    private String name;
    private Category parentCategory;
}
