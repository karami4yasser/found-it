package com.lostitems.lostitemsapi.controller;


import com.lostitems.lostitemsapi.dto.item.ItemOverviewDto;
import com.lostitems.lostitemsapi.enumeration.ItemType;
import com.lostitems.lostitemsapi.service.ItemService;
import lombok.AllArgsConstructor;
import lombok.NonNull;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Validated
@RestController
@RequestMapping(  "/items")
@AllArgsConstructor
public class ItemController {

    private final ItemService itemService ;


    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<ItemOverviewDto>>  getItems(
            @RequestParam(value = "category", required = false)@NonNull
            Optional<UUID> categoryId,
            @RequestParam(value = "type", required = false)@NonNull
            Optional<ItemType> itemType,
            @RequestParam(value = "text", required = false)@NonNull
            Optional<String> text,
            @RequestParam(value = "dateLeft", required = false)@NonNull
            Optional<LocalDate> dateLeft,
            @RequestParam(value = "dateRight", required = false)@NonNull
            Optional<LocalDate> dateRight,
            @RequestParam(value = "longitude", required = false)@NonNull
            Optional<Double> longitude,
            @RequestParam(value = "latitude", required = false)@NonNull
            Optional<Double> latitude,
            @RequestParam(value = "distance", required = false)@NonNull
            Optional<Double> distance,
            @RequestParam(value = "returned", required = false)@NonNull
            Optional<Boolean> returned
    )
    {

        List<ItemOverviewDto> items = itemService.getItems(
                categoryId,
                itemType,
                text,
                dateLeft,
                dateRight,
                latitude,
                longitude,
                distance,
                returned
        );
        return new ResponseEntity<>(items, HttpStatus.OK);

    }

}
