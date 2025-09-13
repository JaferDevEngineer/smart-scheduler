package com.smartScheduler.provider_service.controller;

import java.util.List;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.smartScheduler.provider_service.Entity.Provider;
import com.smartScheduler.provider_service.dto.ProviderRequest;
import com.smartScheduler.provider_service.dto.ResponseData;
import com.smartScheduler.provider_service.security.JwtUtil;
import com.smartScheduler.provider_service.service.ProviderService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/api/provider")
@RequiredArgsConstructor
public class ProviderController {
	
	private final ProviderService providerService;

	@PostMapping("/get")
	private ResponseData<Provider> getProvider(@RequestBody(required = false ) ProviderRequest providerRequest){
		if(providerRequest == null )
			providerRequest = new ProviderRequest();
		return providerService.getProviders(providerRequest);
	}
}
