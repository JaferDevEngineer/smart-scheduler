package com.project.user_service.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserDTO {
	private String uid;
	
	@NotBlank(message = "name is required")
	private String name;
	
	@NotBlank(message = "email is required")
	@Email(message = "email is invalid")
	private String email;
	
	@NotBlank(message = "password is required")
	private String password;

}
