package smart_scheduler_appointment.appointment_service.Dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import smart_scheduler_appointment.appointment_service.enums.AppointmentStatus;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AppointmentUpdateDTO {
    private AppointmentStatus status;
    private LocalDateTime startDateTime;
    private LocalDateTime endDateTime;
}

