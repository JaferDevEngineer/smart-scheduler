package com.smartScheduler.provider_service.security;

import java.util.ArrayList;
import java.util.List;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.smartScheduler.provider_service.Entity.Provider;
import com.smartScheduler.provider_service.Repository.ProviderRespository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class ProviderDetailsService implements UserDetailsService {

    private final ProviderRespository providerRespository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
    	log.warn("hello from loadUserByUsername "+email);
    	try {
        Provider user = providerRespository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        User userData =  new User(
                user.getEmail(), user.getPassword(),  List.of(new SimpleGrantedAuthority("ROLE_USER")));
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