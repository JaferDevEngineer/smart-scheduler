package smart_scheduler_appointment.appointment_service.Dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AppointmentRequestDTO {
    private Long consumerId;     // User who books
    private Long providerId;     // Business providing service
    private LocalDateTime startDateTime;
    private LocalDateTime endDateTime;
    private String notes;
    
    public static void main(String[] args) {
		System.out.println(LocalDateTime.now());
	}
}
