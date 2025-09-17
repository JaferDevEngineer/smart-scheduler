package smart_scheduler_appointment.appointment_service.Dto;

import java.time.LocalDateTime;
import java.time.LocalTime;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
public class UnAvailableTime {

	private LocalTime fromTime;
	private LocalTime toTime;
	 public UnAvailableTime(LocalDateTime start, LocalDateTime end) {
	        this.fromTime = start.toLocalTime();
	        this.toTime   = end.toLocalTime();
	    }
}
