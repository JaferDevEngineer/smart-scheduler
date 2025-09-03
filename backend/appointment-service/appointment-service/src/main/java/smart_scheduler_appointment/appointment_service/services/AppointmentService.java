package smart_scheduler_appointment.appointment_service.services;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import smart_scheduler_appointment.appointment_service.Dto.AnalyticsCount;
import smart_scheduler_appointment.appointment_service.Dto.AppointmentRequestDTO;
import smart_scheduler_appointment.appointment_service.Dto.AppointmentResponseDTO;
import smart_scheduler_appointment.appointment_service.Entitys.Appointment;
import smart_scheduler_appointment.appointment_service.Repository.AppointmentRepository;
import smart_scheduler_appointment.appointment_service.enums.AppointmentStatus;

@Service
@RequiredArgsConstructor
@Slf4j
public class AppointmentService {

    private final AppointmentRepository appointmentRepository;

    // 1️⃣ Create new appointment
    public AppointmentResponseDTO create(AppointmentRequestDTO dto) {
        Appointment appointment = Appointment.builder()
                .consumerId(dto.getConsumerId())
                .providerId(dto.getProviderId())
                .startDateTime(dto.getStartDateTime())
                .endDateTime(dto.getEndDateTime())
                .notes(dto.getNotes())
                .status(AppointmentStatus.PENDING)
                .rated(false)
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();

        return mapToResponse(appointmentRepository.save(appointment));
    }

    // 2️⃣ Get appointments by consumer (user)
    public List<AppointmentResponseDTO> getByConsumer(Long consumerId) {
        return appointmentRepository.findByConsumerId(consumerId)
                .stream().map(this::mapToResponse).toList();
    }

    // 3️⃣ Get appointments by provider (business)
    public List<AppointmentResponseDTO> getByProvider(Long providerId) {
        return appointmentRepository.findByProviderId(providerId)
                .stream().map(this::mapToResponse).toList();
    }

    // 4️⃣ Update status (Accept / Decline / Cancel / Complete)
    public AppointmentResponseDTO updateStatus(Long appointmentId, AppointmentStatus status) {
        Appointment appointment = appointmentRepository.findById(appointmentId)
                .orElseThrow(() -> new RuntimeException("Appointment not found"));

        appointment.setStatus(status);
        appointment.setUpdatedAt(LocalDateTime.now());

        return mapToResponse(appointmentRepository.save(appointment));
    }

    // 5️⃣ Mark appointment as rated
    public AppointmentResponseDTO markRated(Long appointmentId) {
        Appointment appointment = appointmentRepository.findById(appointmentId)
                .orElseThrow(() -> new RuntimeException("Appointment not found"));

        appointment.setRated(true);
        appointment.setUpdatedAt(LocalDateTime.now());

        return mapToResponse(appointmentRepository.save(appointment));
    }

    // Mapper method
    private AppointmentResponseDTO mapToResponse(Appointment appointment) {
    	log.warn("app "+appointment.toString());
        return AppointmentResponseDTO.builder()
                .id(appointment.getId())
                .consumerId(appointment.getConsumerId())
                .providerId(appointment.getProviderId())
                .startDateTime(appointment.getStartDateTime())
                .endDateTime(appointment.getEndDateTime())
                .status(appointment.getStatus())
                .rated(appointment.getRated())
                .notes(appointment.getNotes())
                .createdAt(appointment.getCreatedAt())
                .updatedAt(appointment.getUpdatedAt())
                .providerName(appointment.getProviderName())
                .build();
    }

	public AnalyticsCount consumerAnalytics(long consumerId) {
		return appointmentRepository.analyticsCount(consumerId);
	}
}
