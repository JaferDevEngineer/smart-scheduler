package com.project.user_service.security;

import java.util.ArrayList;

import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.project.user_service.entity.Users;
import com.project.user_service.repository.UserRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
    	log.warn("hello from loadUserByUsername "+email);
    	try {
        Users user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        User userData =  new User(
                user.getEmail(), user.getPassword(), new ArrayList<>());
        log.warn("userData "+userData.toString());
        return userData;
    	}catch (UsernameNotFoundException e) {
    		throw new UsernameNotFoundException("user not found");
		}catch (Exception e) {
			log.error("other exceptions "+e.getStackTrace());
			return null;
		}
    }
}

