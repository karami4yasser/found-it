package com.lostitems.lostitemsapi.dto.item;

import com.lostitems.lostitemsapi.enumeration.ItemType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.UUID;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ItemDetailsDto {

    private UUID id;
    private LocalDate date;
    private LocalDate postDate;
    private ItemType type;
    private String title;
    private String description;
    private String photo;
    private Double longitude;
    private Double latitude;
    private Double range;
    private Boolean returned;

    private String posterFullName;
    private String posterPhoneNumber;
    private String posterImage;
}
