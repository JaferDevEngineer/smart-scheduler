package com.smartScheduler.provider_service.controller.controllerAdvice;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.smartScheduler.provider_service.Exceptions.EmailAlreadyExistException;

@ControllerAdvice
public class GlobalControllerAdvice {

	@ExceptionHandler(UsernameNotFoundException.class)
	public ResponseEntity<String> exceptionHandler( UsernameNotFoundException e) {
		return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
	}
	@ExceptionHandler(EmailAlreadyExistException.class)
	public ResponseEntity<String> emailExceptionHandler(EmailAlreadyExistException e) {
		return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
	}

}
