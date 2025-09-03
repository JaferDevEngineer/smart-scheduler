package smart_scheduler_appointment.appointment_service.Dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import smart_scheduler_appointment.appointment_service.enums.AppointmentStatus;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AppointmentStatusUpdateDTO {
    private AppointmentStatus status;
}

