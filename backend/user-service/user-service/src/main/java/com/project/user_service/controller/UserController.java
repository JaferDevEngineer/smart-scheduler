package com.project.user_service.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.project.user_service.dto.UserDTO;
import com.project.user_service.entity.Users;
import com.project.user_service.mapper.UserMapper;
import com.project.user_service.service.UserService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("api/user")
@RequiredArgsConstructor

public class UserController {
	@Autowired
	private UserService userService;

	@PostMapping
	public ResponseEntity<UserDTO> createUser(@Valid @RequestBody UserDTO userDto) {
		Users savedUser = userService.createUser(UserMapper.toEntity(userDto));
		return new ResponseEntity<>(UserMapper.toDto(savedUser), HttpStatus.CREATED);
	}

	@GetMapping("/{uid}")
	public ResponseEntity<UserDTO> getUser(@PathVariable String uid) {
		Users user = userService.getUserByUid(uid);
		return ResponseEntity.ok(UserMapper.toDto(user));
	}

	@GetMapping
	public List<Users> getAll() {
		return userService.getAllUsers();
	}

	@PutMapping("/{uid}")
	public ResponseEntity<UserDTO> updateUser(@PathVariable String uid, @RequestBody Users user) {
		Users updatedUser = userService.updateUser(uid, user);
		return  ResponseEntity.ok(UserMapper.toDto(updatedUser));
	}

	@DeleteMapping("/{uid}")
	public ResponseEntity<Void> deleteUser(@PathVariable String uid) {
	    userService.deleteUser(uid);
	    return ResponseEntity.noContent().build(); // 204 No Content
	}

}
