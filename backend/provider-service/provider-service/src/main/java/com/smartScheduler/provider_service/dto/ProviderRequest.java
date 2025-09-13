package com.smartScheduler.provider_service.dto;

import lombok.Data;
import lombok.ToString;

@Data
@ToString
public class ProviderRequest {

	private String email;
	private String search;
	private int professionId, limit = 10, page;

}
