package com.lostitems.lostitemsapi.service;


import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.lostitems.lostitemsapi.dto.item.CreateItemRequestDto;
import com.lostitems.lostitemsapi.dto.item.ItemDetailsDto;
import com.lostitems.lostitemsapi.dto.item.ItemOverviewCollection;
import com.lostitems.lostitemsapi.enumeration.ItemType;
import com.lostitems.lostitemsapi.exception.FoundItException;
import com.lostitems.lostitemsapi.exception.FoundItInvalidItemInputDataException;
import com.lostitems.lostitemsapi.exception.FoundItItemNotFoundException;
import com.lostitems.lostitemsapi.exception.FoundItNotPremiumException;
import com.lostitems.lostitemsapi.mapper.ItemMapper;
import com.lostitems.lostitemsapi.model.Item;
import com.lostitems.lostitemsapi.model.User;
import com.lostitems.lostitemsapi.repository.ItemRepository;
import com.lostitems.lostitemsapi.repository.specification.ItemSpecifications;
import com.lostitems.lostitemsapi.security.JwtAuthUtils;
import com.lostitems.lostitemsapi.utils.HaversineUtils;
import lombok.AllArgsConstructor;
import org.springframework.core.io.ClassPathResource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatusCode;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.annotation.Validated;

import java.io.IOException;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static com.lostitems.lostitemsapi.repository.criteria.SpecificationUtils.and;


@Service
@Validated
@AllArgsConstructor
@Transactional
public class ItemService {

    private final ItemRepository itemRepository;
    private final ItemSpecifications itemSpecifications;
    private final ItemMapper itemMapper;
    private final JwtDecoder jwtDecoder;
    private final UserService userService;

    public ItemOverviewCollection getItems(
            Optional<String> category,
            Optional<ItemType> itemType,
            Optional<String> text,
            Optional<LocalDate> dateLeft,
            Optional<LocalDate> dateRight,
            Optional<Double> latitude,
            Optional<Double> longitude,
            Optional<Double> range,
            Optional<Boolean> returned,
            Optional<String> jwt,
            Pageable pageable
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
        Optional<User> user = Optional.empty();
        if(jwt.isPresent())
        {
            JwtAuthUtils.checkTokenValidity(jwt.get());
            JwtAuthUtils.TokenUserInfo userInfo = JwtAuthUtils.getUserInfoFromToken(jwtDecoder, jwt.get());
            user = Optional.of(userService.findUserById(userInfo.userId()));

        }

        Specification<Item> querySpec = getSpec(category, itemType, text, dateLeft, dateRight, latitude, longitude, range, returned,user);

        Page<Item> items = itemRepository.findAll(querySpec,pageable);

        return new ItemOverviewCollection(
                items,
                itemMapper::itemToItemOverviewDto
        );
    }

    private Specification<Item> getSpec(
            Optional<String> category,
            Optional<ItemType> itemType,
            Optional<String> text,
            Optional<LocalDate> dateLeft,
            Optional<LocalDate> dateRight,
            Optional<Double> latitude,
            Optional<Double> longitude,
            Optional<Double> range,
            Optional<Boolean> returned,
            Optional<User> user
    ) {
        return and(
                itemSpecifications.categoryFilter(category),
                itemSpecifications.typeFilter(itemType),
                itemSpecifications.itemsTextContains(text,false),
                itemSpecifications.timeFilter(dateLeft, dateRight),
                itemSpecifications.nearLocation(latitude, longitude, range),
                itemSpecifications.isReturned(returned),
                itemSpecifications.postedByUser(user)
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

        Item itemToSave = itemMapper.createItemRequestDtoToItem(createItemRequestDto);
        itemToSave.setPoster(userService.findUserById(userId));
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

    public List<String> getCategories() {
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            ClassPathResource resource = new ClassPathResource("assets/categories.json");
            return objectMapper.readValue(resource.getInputStream(), new TypeReference<>() {});
        } catch (IOException e) {
            throw new FoundItException("Cannot read categories", HttpStatusCode.valueOf(500));
        }
    }

    public ItemDetailsDto getItem(UUID itemId) {

        Item item = itemRepository.findById(itemId).orElseThrow(
                FoundItItemNotFoundException::new
        );
        ItemDetailsDto itemDetailsDto = itemMapper.itemToItemDetailsDto(item);
        itemDetailsDto.setPosterFullName(item.getPoster().getFirstName() + " " + item.getPoster().getLastName());
        itemDetailsDto.setPosterImage(item.getPoster().getPhoto());
        itemDetailsDto.setPosterPhoneNumber(item.getPoster().getPhone());
        itemDetailsDto.setUserId(item.getPoster().getId());
        return itemDetailsDto;
    }
}
