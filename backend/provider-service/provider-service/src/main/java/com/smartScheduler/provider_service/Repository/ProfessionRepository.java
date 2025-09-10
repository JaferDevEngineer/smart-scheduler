package com.smartScheduler.provider_service.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.smartScheduler.provider_service.Entity.Profession;

public interface ProfessionRepository extends JpaRepository<Profession, Long> {

}
