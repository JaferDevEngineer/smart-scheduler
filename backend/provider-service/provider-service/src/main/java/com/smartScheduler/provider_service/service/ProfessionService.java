package com.smartScheduler.provider_service.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.smartScheduler.provider_service.Entity.Profession;
import com.smartScheduler.provider_service.Repository.ProfessionRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ProfessionService {
	private final ProfessionRepository professionRepository;

	public List<Profession> getAllProfessions() {
	        return professionRepository.findAll();
	    }
}
