package com.lostitems.lostitemsapi.controller;


import com.lostitems.lostitemsapi.dto.item.CreateItemRequestDto;
import com.lostitems.lostitemsapi.dto.item.ItemOverviewDto;
import com.lostitems.lostitemsapi.enumeration.ItemType;
import com.lostitems.lostitemsapi.service.ItemService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.net.URI;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Validated
@RestController
@RequestMapping(  "/api/items")
@AllArgsConstructor
public class ItemController {

    private final ItemService itemService;

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("permitAll()")
    public ResponseEntity<List<ItemOverviewDto>>  getItems(
            @RequestParam(value = "category", required = false)
            Optional<String> categoryName,
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
            Optional<Boolean> returned
    )
    {
        List<ItemOverviewDto> items = itemService.getItems(
                categoryName,
                itemType,
                text,
                dateLeft,
                dateRight,
                latitude,
                longitude,
                range,
                returned
        );
        return new ResponseEntity<>(items, HttpStatus.OK);
    }

    @PreAuthorize("isAuthenticated()")
    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Void> createItem(
            @RequestBody CreateItemRequestDto dto,
            @RequestHeader("Authorization") String token
            ) {
        UUID itemId = itemService.createItem(dto, token);
        return ResponseEntity.created(URI.create("/api/items/" + itemId.toString())).build();
    }
}
