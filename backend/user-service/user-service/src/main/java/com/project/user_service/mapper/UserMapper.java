package com.project.user_service.mapper;

import com.project.user_service.dto.UserDTO;
import com.project.user_service.entity.Users;

public class UserMapper {

	public static UserDTO toDto(Users user) {

		return UserDTO.builder().email(user.getEmail()).name(user.getName()).uid(user.getUid())
				.password(user.getPassword()).build();
	}
	public static Users toEntity(UserDTO userDto) {

		return Users.builder().email(userDto.getEmail()).name(userDto.getName()).uid(userDto.getUid()).build();
	}
}
