package com.smartScheduler.provider_service.dto;

import lombok.Data;
import lombok.ToString;

@Data
@ToString
public class ProviderRequest {

	private String email,search,category;
	private int professionId, limit = 10, page;

}
