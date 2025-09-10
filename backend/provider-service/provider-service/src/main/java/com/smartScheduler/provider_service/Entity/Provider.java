package com.smartScheduler.provider_service.Entity;

import java.time.LocalDateTime;

import com.smartScheduler.provider_service.utils.Utils;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "Providers")
@Builder
public class Provider {
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
	private String password;

	@ManyToOne
	@JoinColumn(name = "profession_id", nullable = false)
	private Profession profession;

	private String description; // e.g. "Experienced dentist with 10 years practice"

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
}
