package com.lostitems.lostitemsapi.dto.item;

import com.lostitems.lostitemsapi.model.Item;
import org.springframework.core.convert.converter.Converter;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.stream.Collectors;

public class ItemOverviewCollection {


    public List<ItemOverviewDto> items;
    public long totalResults;
    public int limit;

    public long count;

    public int offset;
    public boolean hasMore;

    public  ItemOverviewCollection () {}
    public ItemOverviewCollection(
            Page<Item> itemPage,
            Converter<Item, ItemOverviewDto> listConverter
    ) {
        items = itemPage.getContent().stream().map(listConverter::convert).collect(Collectors.toList());
        totalResults = itemPage.getTotalElements();
        limit = itemPage.getSize();
        count = itemPage.getNumberOfElements();
        offset = itemPage.getNumber() * itemPage.getSize();
        hasMore = itemPage.hasNext();
    }
}