package com.lostitems.lostitemsapi.mapper;

import com.lostitems.lostitemsapi.dto.item.CreateItemRequestDto;
import com.lostitems.lostitemsapi.dto.item.ItemDetailsDto;
import com.lostitems.lostitemsapi.dto.item.ItemOverviewDto;
import com.lostitems.lostitemsapi.model.Item;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring",
        unmappedTargetPolicy = ReportingPolicy.IGNORE,
        unmappedSourcePolicy = ReportingPolicy.IGNORE)
public interface ItemMapper {
    @Mapping(target = "isFav", source = "isFav")
    ItemOverviewDto itemToItemOverviewDto(Item item, Boolean isFav);
    Item createItemRequestDtoToItem(CreateItemRequestDto createItemRequestDto);

    ItemDetailsDto itemToItemDetailsDto(Item item);
}
