package com.lostitems.lostitemsapi.dto.user;

import lombok.Data;

@Data
public class GetUserDetailsResponseDto{
    private String firstName;
    private String lastName;
    private String phone;
}
