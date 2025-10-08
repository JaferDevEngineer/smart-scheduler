package smart_scheduler_appointment.appointment_service.Dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data@AllArgsConstructor@NoArgsConstructor
public class ProviderRequest {
private List<Long> ids;
}
