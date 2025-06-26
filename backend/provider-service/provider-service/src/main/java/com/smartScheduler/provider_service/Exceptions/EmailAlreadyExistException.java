package com.smartScheduler.provider_service.Exceptions;

public class EmailAlreadyExistException extends RuntimeException{

	public EmailAlreadyExistException() {
		super("Email Already Exists");
	}
}
