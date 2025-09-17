package smart_scheduler_appointment.appointment_service.Entitys;

import java.time.LocalDateTime;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Transient;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import smart_scheduler_appointment.appointment_service.data.Utils;
import smart_scheduler_appointment.appointment_service.enums.AppointmentStatus;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class Appointment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Participants
    private Long consumerId;   // User (customer)
    private Long providerId;   // Business (doctor, salon, etc.)

    // Time info
    private LocalDateTime startDateTime;
    private LocalDateTime endDateTime;

    // Status
    @Enumerated(EnumType.STRING)
    private AppointmentStatus status;

    // Metadata
    private String notes;
    private Boolean rated;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    @Transient
    private String providerName;
    
    @Column(nullable = false,unique=true,updatable = false)
	private String uid;
    
    @PrePersist
	private void prePersist() {
        if (uid == null)  uid = Utils.generateUUID();
    }
}
