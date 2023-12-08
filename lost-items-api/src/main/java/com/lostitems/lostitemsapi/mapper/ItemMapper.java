package com.lostitems.lostitemsapi.mapper;

import com.lostitems.lostitemsapi.dto.item.CreateItemRequestDto;
import com.lostitems.lostitemsapi.dto.item.ItemOverviewDto;
import com.lostitems.lostitemsapi.model.Item;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ItemMapper {
    ItemOverviewDto itemToItemOverviewDto(Item item);
    Item createItemRequestDtoToItem(CreateItemRequestDto createItemRequestDto);
}
