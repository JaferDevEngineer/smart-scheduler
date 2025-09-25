package smart_scheduler_appointment.appointment_service.services;

import java.lang.module.ResolutionException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import smart_scheduler_appointment.appointment_service.Dto.AnalyticsCount;
import smart_scheduler_appointment.appointment_service.Dto.AppointmentRequestDTO;
import smart_scheduler_appointment.appointment_service.Dto.AppointmentResponseDTO;
import smart_scheduler_appointment.appointment_service.Dto.AppointmentUpdateDTO;
import smart_scheduler_appointment.appointment_service.Dto.ProviderRequest;
import smart_scheduler_appointment.appointment_service.Dto.UnAvailableTime;
import smart_scheduler_appointment.appointment_service.Entitys.Appointment;
import smart_scheduler_appointment.appointment_service.Repository.AppointmentRepository;
import smart_scheduler_appointment.appointment_service.client.ProviderClient;
import smart_scheduler_appointment.appointment_service.data.Constants;
import smart_scheduler_appointment.appointment_service.data.ProviderResponse;
import smart_scheduler_appointment.appointment_service.enums.AppointmentStatus;
import smart_scheduler_appointment.appointment_service.exception.ConflitException;

@Service
@RequiredArgsConstructor
@Slf4j
public class AppointmentService {

	private final AppointmentRepository appointmentRepository;
	private final ProviderClient providerClient;

	// 1️⃣ Create new appointment
	public AppointmentResponseDTO create(AppointmentRequestDTO dto) {
		if (!appointmentRepository.hasCustomerConflict(dto.getConsumerId(), dto.getStartDateTime(),
				dto.getEndDateTime(), null)) {

			Appointment appointment = Appointment.builder().consumerId(dto.getConsumerId())
					.providerId(dto.getProviderId()).startDateTime(dto.getStartDateTime())
					.endDateTime(dto.getEndDateTime()).notes(dto.getNotes()).status(AppointmentStatus.REQUESTED)
					.rated(false).createdAt(LocalDateTime.now()).updatedAt(LocalDateTime.now()).build();

			return mapToResponse(appointmentRepository.save(appointment), null);
		}
		throw new ConflitException(Constants.conflictError);
	}

	// 2️⃣ Get appointments by consumer (user)
	public List<AppointmentResponseDTO> getByConsumer(Long consumerId) {
		List<Appointment> app = appointmentRepository.findByConsumerId(consumerId);
		Set<Long> providerIds = app.stream().map(a -> a.getProviderId()).collect(Collectors.toSet());
		Map<Long, ProviderResponse> providersMap = providerClient
				.getProviderByIds(new ProviderRequest(new ArrayList<>(providerIds))).stream()
				.collect(Collectors.toMap(ProviderResponse::getId, p -> p));
		return app.stream().map(a -> mapToResponse(a, providersMap.get(a.getProviderId()))).toList();

	}

	// 3️⃣ Get appointments by provider (business)
//	public List<AppointmentResponseDTO> getByProvider(Long providerId) {
//		return appointmentRepository.findByProviderId(providerId).stream().map(this::mapToResponse).toList();
//	}

	// 4️⃣ Update status (Accept / Decline / Cancel / Complete)
	public AppointmentResponseDTO updateStatus(Long appointmentId, AppointmentStatus status) {
		Appointment appointment = appointmentRepository.findById(appointmentId)
				.orElseThrow(() -> new RuntimeException("Appointment not found"));

		appointment.setStatus(status);
		appointment.setUpdatedAt(LocalDateTime.now());

		return mapToResponse(appointmentRepository.save(appointment), null);
	}

	// 5️⃣ Mark appointment as rated
	public AppointmentResponseDTO markRated(Long appointmentId) {
		Appointment appointment = appointmentRepository.findById(appointmentId)
				.orElseThrow(() -> new RuntimeException("Appointment not found"));

		appointment.setRated(true);
		appointment.setUpdatedAt(LocalDateTime.now());

		return mapToResponse(appointmentRepository.save(appointment), null);
	}

	// Mapper method
	private AppointmentResponseDTO mapToResponse(Appointment appointment, ProviderResponse providerResponse) {
		return AppointmentResponseDTO.builder().id(appointment.getId()).consumerId(appointment.getConsumerId())
				.providerId(appointment.getProviderId()).startDateTime(appointment.getStartDateTime())
				.endDateTime(appointment.getEndDateTime()).status(appointment.getStatus()).rated(appointment.getRated())
				.notes(appointment.getNotes()).createdAt(appointment.getCreatedAt())
				.updatedAt(appointment.getUpdatedAt()).providerName(appointment.getProviderName()).uid(appointment.getUid())
				.provider(providerResponse).build();
	}

	public AnalyticsCount consumerAnalytics(long consumerId) {
		return appointmentRepository.analyticsCount(consumerId);
	}

	public AppointmentResponseDTO updateAppointment(String appointmentId, AppointmentUpdateDTO dto) {
		Appointment app = appointmentRepository.findByUid(appointmentId)
				.orElseThrow(() -> new ResolutionException(Constants.INVALID_APP_ID));

		if (dto.isCancelled()) {
			app.setStatus(AppointmentStatus.CANCELLED);

		} else if (dto.isDateChanged()) {
			if (!appointmentRepository.hasCustomerConflict(app.getConsumerId(), dto.getStartDateTime(),
					dto.getEndDateTime(), app.getUid())) {
				app.setStartDateTime(dto.getStartDateTime());
				app.setEndDateTime(dto.getEndDateTime());
				app.setStatus(AppointmentStatus.RESCHEDULED);
			} else
				throw new ConflitException(Constants.conflictError);
		}

		app.setNotes(dto.getNotes());
		appointmentRepository.save(app);
		return mapToResponse(app, null);
	}

	public List<UnAvailableTime> getUnAvailableTimes(AppointmentRequestDTO request) {
		return appointmentRepository.getUnAvailableTime(request.getConsumerId(), request.getProviderId(),
				request.getDate());
	}

	public List<ProviderResponse> getProviders(ProviderRequest dto) {
		return providerClient.getProviderByIds(dto);
	}

}
