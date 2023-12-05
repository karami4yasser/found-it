package com.lostitems.lostitemsapi.service;

import com.lostitems.lostitemsapi.security.FoundItUserDetails;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class FoundItUserDetailsService implements UserDetailsService {
    private final UserService userService;

    @Override
    public UserDetails loadUserByUsername(String emailOrPhone) throws UsernameNotFoundException {
        try {
            return new FoundItUserDetails(
                    userService.findUserByPhoneOrEmail(emailOrPhone)
            );
        } catch (RuntimeException e) {
            throw new UsernameNotFoundException(emailOrPhone);
        }
    }
}