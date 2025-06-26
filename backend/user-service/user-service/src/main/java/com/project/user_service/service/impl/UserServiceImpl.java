package com.project.user_service.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.project.user_service.Exceptions.EmailExistException;
import com.project.user_service.dto.UserDTO;
import com.project.user_service.entity.Users;
import com.project.user_service.repository.UserRepository;
import com.project.user_service.service.UserService;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
	
	
	private final UserRepository userRepository;
	private final PasswordEncoder passwordEncoder;

	public Users createUser(Users user) {
	    if (userRepository.existsByEmail(user.getEmail())) {
	        throw new RuntimeException("Email already in use");
	    }
	    return userRepository.save(user);
	}

	public Users getUserByUid(String id) {
	    return userRepository.findByUid(id)
	            .orElseThrow(() -> new RuntimeException("User not found"));
	}

	public List<Users> getAllUsers() {
	    return userRepository.findAll();
	}

	public Users updateUser(String id, Users updatedUser) {
	    Users existing = getUserByUid(id);
	    existing.setName(updatedUser.getName());
	    existing.setPhoneNumber(updatedUser.getPhoneNumber());
	    return userRepository.save(existing);
	}

	@Override
	@Transactional
	public void deleteUser(String uid) {
		 userRepository.deleteByUid(uid);
	}

	public String register(UserDTO userDto) {
		Users user  = new Users();
		
	    if (userRepository.existsByEmail(userDto.getEmail())) {
	        throw new EmailExistException();
	    }

	    user.setEmail(userDto.getEmail());
	    user.setName(userDto.getName());
	    user.setPassword(passwordEncoder.encode(userDto.getPassword()));
	    userRepository.save(user);
	    return "User registered successfully";
	}

	  

}
