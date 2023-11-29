package com.lostitems.lostitemsapi.dto.category;

import java.util.UUID;


public record CategoryDetailsDto
        (
                UUID id,
                String name
        )
{ }
