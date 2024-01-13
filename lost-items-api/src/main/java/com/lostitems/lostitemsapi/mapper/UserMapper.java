package com.lostitems.lostitemsapi.mapper;

import com.lostitems.lostitemsapi.dto.user.CreateUserRequestDto;
import com.lostitems.lostitemsapi.dto.user.GetUserDetailsResponseDto;
import com.lostitems.lostitemsapi.dto.user.UpdateUserRequestDto;
import com.lostitems.lostitemsapi.model.User;
import com.lostitems.lostitemsapi.utils.PhoneUtils;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring",
        unmappedTargetPolicy = ReportingPolicy.IGNORE,
        unmappedSourcePolicy = ReportingPolicy.IGNORE,
        imports = {PhoneUtils.class})
public interface UserMapper {

    @Mapping(target = "phone", expression = "java(PhoneUtils.normalizePhone(dto.phone()))")
    User createUserRequestDtoToUserMapper(CreateUserRequestDto dto);
    @Mapping(target = "phone", expression = "java(PhoneUtils.prefixPhone(user.getPhone()))")
    GetUserDetailsResponseDto userToGetUserDetailsResponseDto(User user);
    User updateUserRequestDtoToUserMapper(UpdateUserRequestDto dto);
}
