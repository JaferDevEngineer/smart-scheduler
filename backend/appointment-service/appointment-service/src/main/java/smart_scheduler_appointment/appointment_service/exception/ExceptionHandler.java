package smart_scheduler_appointment.appointment_service.exception;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;

@ControllerAdvice
public class ExceptionHandler {

	@org.springframework.web.bind.annotation.ExceptionHandler(ConflitException.class) 
	public ResponseEntity<Map<String, Object>> handleConflictException(ConflitException e) {
		Map<String, Object> map = new HashMap<>();
		map.put("timeStamp", LocalDate.now());
		map.put("status", HttpStatus.CONFLICT.value());
		map.put("error", "Conflict");
		map.put("message", e.getMessage());
		return new ResponseEntity<>(map, HttpStatus.CONFLICT);
	}
	@org.springframework.web.bind.annotation.ExceptionHandler(ResourceNotFoundException.class) 
	public ResponseEntity<Map<String, Object>> ResourceNotFoundException(ResourceNotFoundException e) {
		Map<String, Object> map = new HashMap<>();
		map.put("timeStamp", LocalDate.now());
		map.put("status", HttpStatus.NO_CONTENT.value());
		map.put("error", "Invalid Resource");
		map.put("message", e.getMessage());
		return new ResponseEntity<>(map, HttpStatus.NO_CONTENT);
	}
}
