package com.lostitems.lostitemsapi.service;


import com.lostitems.lostitemsapi.dto.item.CreateItemRequestDto;
import com.lostitems.lostitemsapi.dto.item.ItemOverviewDto;
import com.lostitems.lostitemsapi.enumeration.ItemType;
import com.lostitems.lostitemsapi.exception.FoundItInvalidItemInputDataException;
import com.lostitems.lostitemsapi.exception.FoundItItemNotFoundException;
import com.lostitems.lostitemsapi.exception.FoundItNotPremiumException;
import com.lostitems.lostitemsapi.mapper.ItemMapper;
import com.lostitems.lostitemsapi.model.Category;
import com.lostitems.lostitemsapi.model.Item;
import com.lostitems.lostitemsapi.repository.ItemRepository;
import com.lostitems.lostitemsapi.repository.specification.ItemSpecifications;
import com.lostitems.lostitemsapi.security.JwtAuthUtils;
import com.lostitems.lostitemsapi.utils.HaversineUtils;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static com.lostitems.lostitemsapi.repository.criteria.SpecificationUtils.and;


@Service
@Validated
@AllArgsConstructor
public class ItemService {

    private final ItemRepository itemRepository;
    private final ItemSpecifications itemSpecifications;
    private final CategoryService categoryService;
    private final ItemMapper itemMapper;
    private final JwtDecoder jwtDecoder;
    private final UserService userService;

    public List<ItemOverviewDto> getItems(
            Optional<String> categoryName,
            Optional<ItemType> itemType,
            Optional<String> text,
            Optional<LocalDate> dateLeft,
            Optional<LocalDate> dateRight,
            Optional<Double> latitude,
            Optional<Double> longitude,
            Optional<Double> range,
            Optional<Boolean> returned
    ) {
        // TODO: add tests for these three exceptions
        if (itemType.isPresent() && itemType.get().equals(ItemType.LOST)
                && range.isPresent() && range.get() > HaversineUtils.MAX_NON_PREMIUM_ITEM_SEARCH_RANGE) {
            throw new FoundItNotPremiumException();
        }

        if (itemType.isPresent() && itemType.get().equals(ItemType.FOUND)
                && range.isPresent() && range.get() > HaversineUtils.MAX_ITEM_SEARCH_RANGE) {
            throw new FoundItInvalidItemInputDataException("Range is too big");
        }

        if (longitude.isPresent() && (longitude.get() > HaversineUtils.LONGITUDE_BOUNDARY || longitude.get() < -HaversineUtils.LONGITUDE_BOUNDARY)) {
            throw new FoundItInvalidItemInputDataException("Longitude is not valid");
        }

        if (latitude.isPresent() && (latitude.get() > HaversineUtils.LATITUDE_BOUNDARY || latitude.get() < -HaversineUtils.LATITUDE_BOUNDARY)) {
            throw new FoundItInvalidItemInputDataException("Latitude is not valid");
        }

        Optional<Category> category = Optional.empty();
        if (categoryName.isPresent())
        {
            category = Optional.of(categoryService.findCategoryByName(categoryName.get()));
        }
        Specification<Item> querySpec = getSpec(category, itemType, text, dateLeft, dateRight, latitude, longitude, range, returned);

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
            Optional<Double> range,
            Optional<Boolean> returned
    ) {
        return and(
                itemSpecifications.categoryFilter(category),
                itemSpecifications.typeFilter(itemType),
                itemSpecifications.itemsTextContains(text,false),
                itemSpecifications.timeFilter(dateLeft, dateRight),
                itemSpecifications.nearLocation(latitude, longitude, range),
                itemSpecifications.isReturned(returned)
        );
    }

    public UUID createItem(CreateItemRequestDto createItemRequestDto, String token) {

        JwtAuthUtils.checkTokenValidity(token);
        UUID userId = JwtAuthUtils.getUserInfoFromToken(jwtDecoder, token).userId();

        if (createItemRequestDto.type().equals(ItemType.FOUND) &&
                createItemRequestDto.range() > HaversineUtils.MAX_NON_PREMIUM_ITEM_POST_RANGE) {
            throw new FoundItNotPremiumException();
        }

        if (createItemRequestDto.type().equals(ItemType.LOST) &&
                createItemRequestDto.range() > HaversineUtils.MAX_ITEM_POST_RANGE) {
            throw new FoundItInvalidItemInputDataException("Range is too big");
        }

        if (createItemRequestDto.longitude() > HaversineUtils.LONGITUDE_BOUNDARY || createItemRequestDto.longitude() < -HaversineUtils.LONGITUDE_BOUNDARY) {
            throw new FoundItInvalidItemInputDataException("Longitude is not valid");
        }

        if (createItemRequestDto.latitude() > HaversineUtils.LATITUDE_BOUNDARY || createItemRequestDto.latitude() < -HaversineUtils.LATITUDE_BOUNDARY) {
            throw new FoundItInvalidItemInputDataException("Latitude is not valid");
        }

        Category category = null;
        if (createItemRequestDto.categoryName() != null) {
            category = categoryService.findCategoryByName(createItemRequestDto.categoryName());
        }

        Item itemToSave = itemMapper.createItemRequestDtoToItem(createItemRequestDto);
        itemToSave.setPoster(userService.findUserById(userId));
        itemToSave.setCategory(category);
        itemToSave.setPostDate(LocalDate.now());
        itemToSave.setDate(createItemRequestDto.date() != null ? createItemRequestDto.date() : itemToSave.getPostDate());

        return itemRepository.save(itemToSave).getId();
    }

    public void deleteItem(UUID id) {
        if (!itemRepository.existsById(id)) {
            throw new FoundItItemNotFoundException();
        }
        itemRepository.deleteById(id);
    }
}
