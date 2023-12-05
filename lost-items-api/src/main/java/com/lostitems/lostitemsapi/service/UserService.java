package com.lostitems.lostitemsapi.service;

import com.lostitems.lostitemsapi.dto.SignInDto;
import com.lostitems.lostitemsapi.dto.user.CreateUserRequestDto;
import com.lostitems.lostitemsapi.dto.user.GetUserDetailsResponseDto;
import com.lostitems.lostitemsapi.exception.FoundItUserAlreadyExistException;
import com.lostitems.lostitemsapi.exception.FoundItUserNotFoundException;
import com.lostitems.lostitemsapi.mapper.UserMapper;
import com.lostitems.lostitemsapi.model.User;
import com.lostitems.lostitemsapi.repository.UserRepository;
import com.lostitems.lostitemsapi.security.FoundItUserDetails;
import com.lostitems.lostitemsapi.security.JwtAuthUtils;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Map;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;
    private final JwtDecoder jwtDecoder;
    private final JwtEncoder jwtEncoder;

    protected Map<String, String> signInCreatedUser(User user) {
        Instant now = Instant.now();

        String accessToken = JwtAuthUtils.createToken(
                new JwtAuthUtils.TokenUserInfo(
                        user.getId(),
                        user.getPhone()
                ),
                now.plusSeconds(JwtAuthUtils.ACCESS_TOKEN_EXPIRATION_TIME),
                jwtEncoder
        );

        // Create Refresh Token
        String refreshToken = JwtAuthUtils.createToken(
                new JwtAuthUtils.TokenUserInfo(
                        user.getId(),
                        user.getPhone()
                ),
                now.plusSeconds(JwtAuthUtils.REFRESH_TOKEN_EXPIRATION_TIME),
                jwtEncoder
        );

        return Map.of("accessToken", accessToken, "refreshToken", refreshToken);
    }

    public Map<String, String> createUser(CreateUserRequestDto dto) {
        checkPhoneOrEmailDoesNotExists(dto.phone());
        User user = userMapper.createUserRequestDtoToUserMapper(dto);
        user.setPassword(passwordEncoder.encode(dto.password()));
        user = userRepository.save(user);
        return signInCreatedUser(user);
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

    public User findUserById(UUID id){
        return userRepository.findById(id).orElseThrow(
                FoundItUserNotFoundException::new
        );
    }


    public GetUserDetailsResponseDto getCurrentUserDetails(String jwt) {
        JwtAuthUtils.checkTokenValidity(jwt);
        JwtAuthUtils.TokenUserInfo userInfo = JwtAuthUtils.getUserInfoFromToken(jwtDecoder, jwt);
        return userMapper.userToGetUserDetailsResponseDto(findUserById(userInfo.userId()));
    }
}
