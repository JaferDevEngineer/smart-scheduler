package smart_scheduler_appointment.appointment_service.enums;

public enum AppointmentStatus {
	    PENDING,       // created, waiting for provider approval
	    ACCEPTED,      // approved by provider
	    DECLINED,      // rejected by provider
	    CANCELLED,     // cancelled by either user/provider before start
	    ONGOING,       // current time between start and end
	    COMPLETED      // finished successfully
}
