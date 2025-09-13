package com.smartScheduler.provider_service.service;

import java.util.List;

import com.smartScheduler.provider_service.Entity.Provider;
import com.smartScheduler.provider_service.dto.AuthRequest;
import com.smartScheduler.provider_service.dto.ProviderRequest;
import com.smartScheduler.provider_service.dto.ResponseData;

public interface ProviderService {
	
	public String createUser(AuthRequest auth);
	
	public ResponseData<Provider> getProviders(ProviderRequest providerRequest);
	
	

}
