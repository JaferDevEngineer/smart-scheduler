package smart_scheduler_appointment.appointment_service.enums;

public enum AppointmentStatus {
	
		REQUESTED,
		ACCEPTED,      // approved by provider
//	    PENDING,       // created, waiting for provider approval
	    DECLINED,      // rejected by provider
	    CANCELLED,     // cancelled by either user/provider before start
	    ONGOING,       // current time between start and end
	    COMPLETED      // finished successfully
}
