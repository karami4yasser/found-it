package com.lostitems.lostitemsapi.service;

import com.lostitems.lostitemsapi.dto.user.CreateUserRequestDto;
import com.lostitems.lostitemsapi.dto.user.GetUserDetailsResponseDto;
import com.lostitems.lostitemsapi.dto.user.UpdateUserRequestDto;
import com.lostitems.lostitemsapi.exception.FoundItUserAlreadyExistException;
import com.lostitems.lostitemsapi.exception.FoundItUserNotFoundException;
import com.lostitems.lostitemsapi.mapper.UserMapper;
import com.lostitems.lostitemsapi.model.User;
import com.lostitems.lostitemsapi.repository.ItemRepository;
import com.lostitems.lostitemsapi.repository.UserRepository;
import com.lostitems.lostitemsapi.security.JwtAuthUtils;
import com.lostitems.lostitemsapi.utils.PhoneUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Collection;
import java.util.Collections;
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
    private final ItemRepository itemRepository;
    private FeedbackService feedbackService;

    @Autowired
    public void setFeedbackService(FeedbackService feedbackService) {
        this.feedbackService = feedbackService;
    }

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

        UUID currentUserId = user.getId();

        return Map.of("accessToken", accessToken, "refreshToken", refreshToken,"userId",currentUserId.toString());
    }

    public Map<String, String> createUser(CreateUserRequestDto dto) {
        checkPhoneOrEmailDoesNotExists(dto.phone());
        User user = userMapper.createUserRequestDtoToUserMapper(dto);
        user.setPassword(passwordEncoder.encode(dto.password()));
        user = userRepository.save(user);
        userRepository.flush();
        return signInCreatedUser(user);
    }

    public void checkPhoneOrEmailDoesNotExists(String emailOrPhone) {
        if (userRepository.userExistsByEmailOrPhone(PhoneUtils.normalizePhone(emailOrPhone))) {
            throw new FoundItUserAlreadyExistException(emailOrPhone);
        }
    }

    public User findUserByPhoneOrEmail(String emailOrPhone){
        return userRepository.findUserByEmailOrPhone(PhoneUtils.normalizePhone(emailOrPhone)).orElseThrow(
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
        return getUserDetails(userInfo.userId());
    }

    public void updateUserDetails(String jwt, UpdateUserRequestDto dto) {
        JwtAuthUtils.checkTokenValidity(jwt);
        JwtAuthUtils.TokenUserInfo userInfo = JwtAuthUtils.getUserInfoFromToken(jwtDecoder, jwt);
        User user = findUserById(userInfo.userId());
        user.setPhone(PhoneUtils.normalizePhone(dto.phone()));
        user.setFirstName(dto.firstName());
        user.setLastName(dto.lastName());
        userRepository.save(user);
    }

    public GetUserDetailsResponseDto getUserDetails(UUID userId) {
        GetUserDetailsResponseDto getUserDetailsResponseDto = userMapper.userToGetUserDetailsResponseDto(findUserById(userId));
        getUserDetailsResponseDto.setFeedbackStatistics(feedbackService.getFeedbackStatisticsByUser((userId)));
        getUserDetailsResponseDto.setNumberOfPosts(itemRepository.countPostedItemsByUser(userId));
        return getUserDetailsResponseDto;
    }

    public void addFavItemToUser(User user, UUID itemId) {
        if (user.getFavItems().contains(itemId)) {
            user.getFavItems().removeAll(Collections.singleton(itemId));
        } else {
            user.addFavItem(itemId);
        }
        userRepository.save(user);
    }
}
