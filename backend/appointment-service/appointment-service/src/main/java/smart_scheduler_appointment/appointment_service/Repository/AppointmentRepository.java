package smart_scheduler_appointment.appointment_service.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import smart_scheduler_appointment.appointment_service.Dto.AnalyticsCount;
import smart_scheduler_appointment.appointment_service.Entitys.Appointment;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
	List<Appointment> findByConsumerId(Long consumerId);

	List<Appointment> findByProviderId(Long providerId);

	@Query("""
		    select new smart_scheduler_appointment.appointment_service.Dto.AnalyticsCount(
		      COALESCE(SUM(CASE WHEN a.status = 'PENDING' THEN 1 ELSE 0 END), 0),
		      COALESCE(SUM(CASE WHEN a.status = 'ACCEPTED' THEN 1 ELSE 0 END), 0),
		      COALESCE(SUM(CASE WHEN a.status = 'CANCELLED' THEN 1 ELSE 0 END), 0),
		      COALESCE(SUM(CASE WHEN a.status = 'COMPLETED' THEN 1 ELSE 0 END), 0),
		      COALESCE(SUM(CASE WHEN a.status = 'DECLINED' THEN 1 ELSE 0 END), 0),
		      COUNT(a)
		    )
		    from Appointment a
		    where a.consumerId = :consumerId
		    """)
		AnalyticsCount analyticsCount(long consumerId);

}
