package com.smartScheduler.provider_service.controller;

import java.util.List;
import java.util.Map;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
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
@Slf4j
public class ProviderController {

	private final ProviderService providerService;

	@PostMapping("/get")
	private ResponseData<Provider> getProvider(@RequestBody(required = false) ProviderRequest providerRequest) {
		if (providerRequest == null)
			providerRequest = new ProviderRequest();
		return providerService.getProviders(providerRequest);
	}

	@PostMapping("/getById")
	private List<Provider> getProviderByIds(@RequestBody(required = true) ProviderRequest providerRequest,
			@RequestHeader Map<String, String> headers, Authentication auth) {
		log.warn("Headers: " + headers);
		log.warn("Auth: " + auth);
		log.warn("providerRequest " + providerRequest);

		if (providerRequest == null)
			providerRequest = new ProviderRequest();
		return providerService.getProvidersById(providerRequest);
	}
}
