package com.lostitems.lostitemsapi.dto.item;

import com.lostitems.lostitemsapi.enumeration.ItemType;

import java.time.LocalDate;
import java.util.UUID;

public record ItemOverviewDto(
        UUID id,
        LocalDate date,
        LocalDate postDate,
        ItemType type,
        String title,
        String photo,
        Boolean returned,
        Boolean isFav
)
{
}
