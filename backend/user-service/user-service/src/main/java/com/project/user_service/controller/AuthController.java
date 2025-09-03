package com.project.user_service.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.user_service.Exceptions.EmailExistException;
import com.project.user_service.dto.AuthRequest;
import com.project.user_service.dto.AuthResponse;
import com.project.user_service.dto.UserDTO;
import com.project.user_service.entity.Users;
import com.project.user_service.repository.UserRepository;
import com.project.user_service.security.JWTUtil;
import com.project.user_service.security.JwtFilter;
import com.project.user_service.service.UserService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/auth/user")
@RequiredArgsConstructor
@Slf4j
public class AuthController {

	private final UserService userService;


	@PostMapping("/register")
	private ResponseEntity<String> register(@RequestBody UserDTO user) {
		return ResponseEntity.ok(userService.register(user));
	}

	@PostMapping("/login")
	private ResponseEntity<?> logIn(@RequestBody AuthRequest authrequest) {
		try {
			return ResponseEntity.ok(userService.logIn(authrequest));
		} catch (BadCredentialsException | UsernameNotFoundException e) {
			log.error("bad credentials " + authrequest.toString());
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password");
		} catch (Exception e) {
			log.error("Exception in logIn  " );
			e.printStackTrace();
			return null;
		}
	}

}
