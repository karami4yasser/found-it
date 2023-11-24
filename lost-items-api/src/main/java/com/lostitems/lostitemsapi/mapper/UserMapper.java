package com.lostitems.lostitemsapi.mapper;

import com.lostitems.lostitemsapi.dto.user.CreateUserRequestDto;
import com.lostitems.lostitemsapi.model.User;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE, unmappedSourcePolicy = ReportingPolicy.IGNORE)
public interface UserMapper {
    User createUserRequestDtoToBeneficiaryMapper(CreateUserRequestDto dto);
}
