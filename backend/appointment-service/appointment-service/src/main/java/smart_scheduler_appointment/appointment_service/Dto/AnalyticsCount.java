package smart_scheduler_appointment.appointment_service.Dto;

public record AnalyticsCount(long requested ,long accepted, long cancelled, long completed,  long declined, long total) {
}
