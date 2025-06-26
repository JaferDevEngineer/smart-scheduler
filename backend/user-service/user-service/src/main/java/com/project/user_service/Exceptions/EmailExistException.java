package com.project.user_service.Exceptions;

public class EmailExistException extends RuntimeException {
	public EmailExistException() {
		super("Email already exists");
	}
//	 public EmailExistException(String message) {
//	        super(message);
//	    }
//
//	    public EmailExistException(String message, Throwable cause) {
//	        super(message, cause);
//	    }
//
//	    public EmailExistException(Throwable cause) {
//	        super(cause);
//	    }

}
