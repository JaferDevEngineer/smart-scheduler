package com.smartScheduler.provider_service.service;

import java.util.List;

import org.springframework.data.domain.PageRequest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.smartScheduler.provider_service.Entity.Provider;
import com.smartScheduler.provider_service.Exceptions.EmailAlreadyExistException;
import com.smartScheduler.provider_service.Repository.ProfessionRepository;
import com.smartScheduler.provider_service.Repository.ProviderRespository;
import com.smartScheduler.provider_service.dto.AuthRequest;
import com.smartScheduler.provider_service.dto.ProviderRequest;
import com.smartScheduler.provider_service.dto.ResponseData;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RequiredArgsConstructor
@Service
@Slf4j
public class ProviderServiceImpl implements ProviderService {

	private final ProviderRespository providerRespository;
	private final PasswordEncoder passwordEncoder;
	private final ProfessionRepository professionRepository;

	@Override
	public String createUser(AuthRequest auth) {
		Provider provider = new Provider();
		if (providerRespository.existsByEmail(auth.getEmail())) {
			throw new EmailAlreadyExistException();
		}
		provider.setEmail(auth.getEmail());
		provider.setName(auth.getName());
		provider.setPassword(passwordEncoder.encode(auth.getPassword()));
		provider.setProfession(professionRepository.findById(auth.getProfessionId()).get());
		providerRespository.save(provider);
		return "User Created Successfully";
	}

	@Override
	public ResponseData<Provider> getProviders(ProviderRequest providerRequest) {
		log.warn("providerRequest "+providerRequest);
		List<Provider> providers = providerRespository.findByProfessionAndEmailAndSearch(
				providerRequest.getProfessionId(), providerRequest.getSearch(),providerRequest.getCategory(),
				PageRequest.of(providerRequest.getPage(), providerRequest.getLimit()));

		return new ResponseData<>(providers, providerRespository
				.findCountByProfessionAndEmailAndSearch(providerRequest.getProfessionId(), providerRequest.getSearch())
				.orElse(0));
	}

//	public List<Provider> getAll(){
//		
//	}

}
