package com.project.user_service.service;

import java.util.List;

import com.project.user_service.entity.Users;

public interface UserService {

	Users createUser(Users user);

	Users getUserByUid(String id);

	List<Users> getAllUsers();

	Users updateUser(String uid, Users updatedUser);

	void deleteUser(String id);
}
