package com.lostitems.lostitemsapi.dto.item;

import com.lostitems.lostitemsapi.model.Item;
import lombok.AllArgsConstructor;
import lombok.Setter;
import org.springframework.core.convert.converter.Converter;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.stream.Collectors;

@AllArgsConstructor
public class ItemOverviewCollection {
    public List<ItemOverviewDto> items;
    public long totalResults;
    public int limit;
    public long count;
    public int offset;
    public boolean hasMore;

    public  ItemOverviewCollection () {}
}