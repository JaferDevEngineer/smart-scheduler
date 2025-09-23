package com.smartScheduler.provider_service.controller;

import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.smartScheduler.provider_service.Entity.Provider;
import com.smartScheduler.provider_service.Repository.ProviderRespository;
import com.smartScheduler.provider_service.dto.AuthRequest;
import com.smartScheduler.provider_service.dto.AuthResponse;
import com.smartScheduler.provider_service.security.JwtUtil;
import com.smartScheduler.provider_service.service.ProviderService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("auth/provider")
@RequiredArgsConstructor
@Slf4j
public class AuthController {

	private final ProviderService providerSerice;
//	private final AuthenticationManager authenticationManager;
	private final JwtUtil jwtUtil;
	private final ProviderRespository providerRespository;
	private final PasswordEncoder passwordEncoder;
	

	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody AuthRequest authRequest) {
		try {
//			Authentication auth = authenticationManager.authenticate(
//					new UsernamePasswordAuthenticationToken(authrequest.getEmail(), authrequest.getPassword()));
//			log.warn("auth " + auth.toString());
			 Optional<Provider> provider = providerRespository.findByEmail(authRequest.getEmail());
		        if (provider.isEmpty() || !passwordEncoder.matches(authRequest.getPassword(), provider.get().getPassword())) {
		            throw new BadCredentialsException("Invalid credentials");
		        }
			String token = jwtUtil.generateToken(authRequest.getEmail());
			return ResponseEntity.ok(new AuthResponse(token));
		} catch (BadCredentialsException | UsernameNotFoundException e) {
			log.error("bad credentials " + authRequest.toString());
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password");
		} catch (Exception e) {
			log.error("Exception in logIn  " );
			e.printStackTrace();
			return null;
		}
	}

	@PostMapping("/register")
	public ResponseEntity<String> register(@RequestBody AuthRequest auth) {
		return ResponseEntity.ok(providerSerice.createUser(auth));
	}

}
