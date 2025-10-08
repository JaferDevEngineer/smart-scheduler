package smart_scheduler_appointment.appointment_service.data;

import java.time.LocalDateTime;

import lombok.Data;

@Data
public class ProviderResponse {
	private Long id;

	private String uid;

	private String name;

	private String email;

	private String phoneNumber;

	private LocalDateTime createdAt;

	private LocalDateTime updatedAt;

	private String password;

	private Profession profession;

	private String description;

	@Data
	public static class Profession {
		private Long id;
		private String category;
		private String name;
	}
}
