package smart_scheduler_appointment.appointment_service.Dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import smart_scheduler_appointment.appointment_service.data.ProviderResponse;
import smart_scheduler_appointment.appointment_service.enums.AppointmentStatus;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AppointmentResponseDTO {
    private Long id;
    private Long consumerId;
    private Long providerId;
    private LocalDateTime startDateTime;
    private LocalDateTime endDateTime;
    private AppointmentStatus status;
    private Boolean rated;
    private String notes;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private String providerName;
    private ProviderResponse provider;
    private String uid;
}
