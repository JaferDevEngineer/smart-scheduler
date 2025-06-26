package com.smartScheduler.provider_service.service;

import java.util.List;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.smartScheduler.provider_service.Entity.Provider;
import com.smartScheduler.provider_service.Exceptions.EmailAlreadyExistException;
import com.smartScheduler.provider_service.Repository.ProviderRespository;
import com.smartScheduler.provider_service.dto.AuthRequest;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class ProviderServiceImpl implements ProviderService{

	private final ProviderRespository providerRespository;
	private final PasswordEncoder passwordEncoder;
	@Override
	public String createUser(AuthRequest auth) {
		Provider provider = new Provider();
		if (providerRespository.existsByEmail(auth.getEmail())) {
	        throw new EmailAlreadyExistException();
	    }
		provider.setEmail(auth.getEmail());
		provider.setName(auth.getName());
		provider.setPassword(passwordEncoder.encode(auth.getPassword()));
	     providerRespository.save(provider);
		return "User Created Successfully";
	}

	@Override
	public String registerUser(AuthRequest auth) {
		
		return null;
	}


	
}
