package com.project.user_service.entity;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.project.user_service.utils.Utils;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import jakarta.persistence.Transient;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "users")
@Builder
public class Users {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(unique = true, nullable = false)
	private String uid;

	private String name;

	@Column(unique = true, nullable = false)
	private String email;

	private String phoneNumber;

	private LocalDateTime createdAt;

	private LocalDateTime updatedAt;
	
	@Column(nullable = false)
	@JsonIgnore
	private String password;
	

	@PrePersist
	public void onCreate() {
	    this.createdAt = LocalDateTime.now();
	    this.updatedAt = this.createdAt;
	    this.uid = Utils.generateUUID();
	}

	@PreUpdate
	public void onUpdate() {
	    this.updatedAt = LocalDateTime.now();
	}
	@Transient
	private String token;
	
}
