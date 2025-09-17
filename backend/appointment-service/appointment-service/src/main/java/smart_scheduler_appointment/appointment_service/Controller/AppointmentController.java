package smart_scheduler_appointment.appointment_service.Controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import smart_scheduler_appointment.appointment_service.Dto.AnalyticsCount;
import smart_scheduler_appointment.appointment_service.Dto.AppointmentRequestDTO;
import smart_scheduler_appointment.appointment_service.Dto.AppointmentResponseDTO;
import smart_scheduler_appointment.appointment_service.Dto.AppointmentUpdateDTO;
import smart_scheduler_appointment.appointment_service.Dto.UnAvailableTime;
import smart_scheduler_appointment.appointment_service.services.AppointmentService;

@RestController
@RequestMapping("/api/appointments")
@RequiredArgsConstructor
public class AppointmentController {

    private final AppointmentService service;

    // 1️⃣ Create appointment
    @PostMapping
    public ResponseEntity<AppointmentResponseDTO> create(@RequestBody AppointmentRequestDTO dto) {
        return ResponseEntity.ok(service.create(dto));
    }

    // 2️⃣ Get all appointments for a consumer (user)
    @GetMapping("{consumerId}/consumerApp")
    public ResponseEntity<List<AppointmentResponseDTO>> getConsumerAppointments(@PathVariable Long consumerId) {
        return ResponseEntity.ok(service.getByConsumer(consumerId));
    }

    // 3️⃣ Get all appointments for a provider (business)
    @GetMapping("/{providerId}/providerApp")
    public ResponseEntity<List<AppointmentResponseDTO>> getProviderAppointments(@PathVariable Long providerId) {
        return ResponseEntity.ok(service.getByProvider(providerId));
    }
    @GetMapping("/consumer/{consumerId}/analytics")
    public ResponseEntity<AnalyticsCount> consumerAnalytics(@PathVariable long consumerId) {
        return ResponseEntity.ok(service.consumerAnalytics(consumerId));
    }

    // 4️⃣ Update status
    @PutMapping("/{appointmentId}/status")
    public ResponseEntity<AppointmentResponseDTO> updateStatus(@PathVariable Long appointmentId,
                                                               @RequestBody AppointmentUpdateDTO dto) {
        return ResponseEntity.ok(service.updateStatus(appointmentId, dto.getStatus()));
    }

    // 5️⃣ Mark as rated
    @PutMapping("/{appointmentId}/rated")
    public ResponseEntity<AppointmentResponseDTO> markRated(@PathVariable Long appointmentId) {
        return ResponseEntity.ok(service.markRated(appointmentId));
    }
//    @PatchMapping("/{appointmentId}/update")
//    public ResponseEntity<AppointmentResponseDTO> updateAppointment(@PathVariable Long appointmentId,
//                                                               @RequestBody AppointmentUpdateDTO dto) {
//        return ResponseEntity.ok(service.updateAppointment(appointmentId, dto));
//    }
    @PostMapping("/unAvailableTime")
    public ResponseEntity<List<UnAvailableTime>> unAvailableTime(@RequestBody AppointmentRequestDTO dto) {
        return ResponseEntity.ok(service.getUnAvailableTimes(dto));
    }
}
