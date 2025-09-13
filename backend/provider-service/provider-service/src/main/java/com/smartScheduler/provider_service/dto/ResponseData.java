package com.smartScheduler.provider_service.dto;

import java.util.ArrayList;
import java.util.List;

import lombok.Data;

@Data
public class ResponseData<T> {

	private List<T> data = new ArrayList<>();
	private int count;

	public ResponseData(List<T> data, int count) {
		this.data = data;
		this.count = count;
	}

}
