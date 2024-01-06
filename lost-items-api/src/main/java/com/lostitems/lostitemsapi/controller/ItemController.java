package com.lostitems.lostitemsapi.controller;


import com.lostitems.lostitemsapi.dto.item.CreateItemRequestDto;
import com.lostitems.lostitemsapi.dto.item.ItemDetailsDto;
import com.lostitems.lostitemsapi.dto.item.ItemOverviewCollection;
import com.lostitems.lostitemsapi.enumeration.ItemType;
import com.lostitems.lostitemsapi.service.ItemService;
import com.lostitems.lostitemsapi.utils.OffsetBasedPageRequest;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Validated
@RestController
@RequestMapping(  "/api/items")
@AllArgsConstructor
@Slf4j
public class ItemController {

    private final ItemService itemService;

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("permitAll()")
    public ResponseEntity<ItemOverviewCollection>  getItems(
            @RequestParam(value = "category", required = false)
            Optional<String> category,
            @RequestParam(value = "type", required = false)
            Optional<ItemType> itemType,
            @RequestParam(value = "text", required = false)
            Optional<String> text,
            @RequestParam(value = "dateLeft", required = false)
            Optional<LocalDate> dateLeft,
            @RequestParam(value = "dateRight", required = false)
            Optional<LocalDate> dateRight,
            @RequestParam(value = "longitude", required = false)
            Optional<Double> longitude,
            @RequestParam(value = "latitude", required = false)
            Optional<Double> latitude,
            @RequestParam(value = "range", required = false)
            Optional<Double> range,
            @RequestParam(value = "returned", required = false)
            Optional<Boolean> returned,
            @RequestParam(value = "userId", required = false)
            Optional<UUID> userId,
            @RequestHeader(value = "Authorization",required = false) Optional<String> jwt,
            @RequestParam(value = "limit", defaultValue = "10", required = false)  @Min(1)
            int limit,
            @RequestParam(value = "offset", defaultValue = "0", required = false)@Min(0)
            int offset

    )
    {
        ItemOverviewCollection items = itemService.getItems(
                category,
                itemType,
                text,
                dateLeft,
                dateRight,
                latitude,
                longitude,
                range,
                returned,
                jwt,
                userId,
                new OffsetBasedPageRequest(offset, limit, Sort.by(Sort.Direction.DESC, "postDate"))
        );
        return new ResponseEntity<>(items, HttpStatus.OK);
    }

    @PreAuthorize("isAuthenticated()")
    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Void> createItem(
            @Valid @RequestBody CreateItemRequestDto dto,
            @RequestHeader("Authorization") String token
            ) {
        UUID itemId = itemService.createItem(dto, token);
        return ResponseEntity.created(URI.create("/api/items/" + itemId.toString())).build();
    }

    @PreAuthorize("permitAll()")
    @GetMapping(path = "/categories")
    public ResponseEntity<List<String>> getCategories() {
        List<String> categories = itemService.getCategories();
        return ResponseEntity.ok(categories);
    }

    @GetMapping(value ="/{id}" , produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("permitAll()")
    public ResponseEntity<ItemDetailsDto>  getItem(
            @PathVariable UUID id
    ) {
        ItemDetailsDto item = itemService.getItem(id);
        return new ResponseEntity<>(item, HttpStatus.OK);
    }
}
