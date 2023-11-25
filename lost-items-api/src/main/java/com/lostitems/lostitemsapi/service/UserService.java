package com.lostitems.lostitemsapi.service;

import com.lostitems.lostitemsapi.dto.user.CreateUserRequestDto;
import com.lostitems.lostitemsapi.exception.FoundItUserAlreadyExistException;
import com.lostitems.lostitemsapi.exception.FoundItUserNotFoundException;
import com.lostitems.lostitemsapi.mapper.UserMapper;
import com.lostitems.lostitemsapi.model.User;
import com.lostitems.lostitemsapi.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;

    public void createUser(CreateUserRequestDto dto) {
        checkPhoneOrEmailDoesNotExists(dto.phone());
        User user = userMapper.createUserRequestDtoToBeneficiaryMapper(dto);
        user.setPassword(passwordEncoder.encode(dto.password()));
        userRepository.save(user);
    }

    public void checkPhoneOrEmailDoesNotExists(String emailOrPhone) {
        if (userRepository.userExistsByEmailOrPhone(emailOrPhone)) {
            throw new FoundItUserAlreadyExistException(emailOrPhone);
        }
    }

    public User findUserByPhoneOrEmail(String emailOrPhone){
        return userRepository.findUserByEmailOrPhone(emailOrPhone).orElseThrow(
                FoundItUserNotFoundException::new
        );
    }
}
