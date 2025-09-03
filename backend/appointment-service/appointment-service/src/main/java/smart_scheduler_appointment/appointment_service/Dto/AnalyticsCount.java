package smart_scheduler_appointment.appointment_service.Dto;

public record AnalyticsCount(long pending,long accepted, long cancelled, long completed,  long declined, long total) {
}
