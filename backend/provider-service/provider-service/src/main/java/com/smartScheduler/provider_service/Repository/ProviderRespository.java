package com.smartScheduler.provider_service.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.smartScheduler.provider_service.Entity.Provider;

public interface ProviderRespository extends JpaRepository<Provider, Long> {

	Optional<Provider> findByEmail(String email);

	boolean existsByEmail(String email);

}
