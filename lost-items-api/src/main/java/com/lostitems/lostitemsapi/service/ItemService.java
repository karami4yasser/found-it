package com.lostitems.lostitemsapi.service;


import com.lostitems.lostitemsapi.dto.item.ItemOverviewDto;
import com.lostitems.lostitemsapi.enumeration.ItemType;
import com.lostitems.lostitemsapi.mapper.ItemMapper;
import com.lostitems.lostitemsapi.model.Category;
import com.lostitems.lostitemsapi.model.Item;
import com.lostitems.lostitemsapi.repository.ItemRepository;
import com.lostitems.lostitemsapi.repository.specification.ItemSpecifications;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static com.lostitems.lostitemsapi.repository.criteria.SpecificationUtils.and;


@Service
@AllArgsConstructor
public class ItemService {
    private static final Logger LOG = LoggerFactory.getLogger(ItemService.class);

    private final ItemRepository itemRepository;

    private final ItemSpecifications itemSpecifications;

    private final CategoryService categoryService;

    private final ItemMapper itemMapper;

    public List<ItemOverviewDto> getItems(
            Optional<UUID> categoryId,
            Optional<ItemType> itemType,
            Optional<String> text,
            Optional<LocalDate> dateLeft,
            Optional<LocalDate> dateRight,
            Optional<Double> latitude,
            Optional<Double> longitude,
            Optional<Double> distance,
            Optional<Boolean> returned
    ) {

        Optional<Category> category = Optional.empty();
        if (categoryId.isPresent())
        {
            category = Optional.of(categoryService.findCategoryById(categoryId.get()));
        }
        LOG.info("Found Items filtered");
        Specification<Item> querySpec = getSpec(category, itemType, text, dateLeft, dateRight,latitude,longitude,distance,returned);

        return itemRepository.findAll(querySpec, Sort.by(Sort.Direction.DESC, "postDate")).stream().map(
                (itemMapper::itemToItemOverviewDto)
        ).toList();
    }

    private Specification<Item> getSpec(
            Optional<Category> category,
            Optional<ItemType> itemType,
            Optional<String> text,
            Optional<LocalDate> dateLeft,
            Optional<LocalDate> dateRight,
            Optional<Double> latitude,
            Optional<Double> longitude,
            Optional<Double> distance,
            Optional<Boolean> returned
    ) {
        Specification<Item> spec = and(
                itemSpecifications.categoryFilter(category),
                itemSpecifications.typeFilter(itemType),
                itemSpecifications.itemsTextContains(text,false),
                itemSpecifications.timeFilter(dateLeft, dateRight),
                itemSpecifications.nearLocation(latitude, longitude, distance),
                itemSpecifications.isReturned(returned)
        );

        LOG.debug("Filtered items specification: {}.", spec);
        return spec;
    }

}
