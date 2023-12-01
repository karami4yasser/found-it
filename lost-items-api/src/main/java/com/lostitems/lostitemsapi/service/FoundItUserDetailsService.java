package com.lostitems.lostitemsapi.service;

import com.lostitems.lostitemsapi.security.FoundItUserDetails;
import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class FoundItUserDetailsService implements UserDetailsService {
    private UserService userService;
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