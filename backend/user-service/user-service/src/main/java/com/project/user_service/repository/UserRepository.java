package com.project.user_service.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.user_service.entity.Users;

import jakarta.transaction.Transactional;

public interface UserRepository extends JpaRepository<Users, Long>{
	boolean existsByEmail(String email);

	Optional<Users> findByUid(String id);

//	@Transactional
	int deleteByUid(String uid);

}
