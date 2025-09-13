package smart_scheduler_appointment.appointment_service.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import smart_scheduler_appointment.appointment_service.Dto.AnalyticsCount;
import smart_scheduler_appointment.appointment_service.Entitys.Appointment;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
	List<Appointment> findByConsumerId(Long consumerId);

	List<Appointment> findByProviderId(Long providerId);

	@Query("""
		    select new smart_scheduler_appointment.appointment_service.Dto.AnalyticsCount(
		      COALESCE(SUM(CASE WHEN a.status = 'REQUESTED' THEN 1 ELSE 0 END), 0),
		      COALESCE(SUM(CASE WHEN a.status = 'ACCEPTED' THEN 1 ELSE 0 END), 0),
		      COALESCE(SUM(CASE WHEN a.status = 'CANCELLED' THEN 1 ELSE 0 END), 0),
		      COALESCE(SUM(CASE WHEN a.status = 'COMPLETED' THEN 1 ELSE 0 END), 0),
		      COALESCE(SUM(CASE WHEN a.status = 'DECLINED' THEN 1 ELSE 0 END), 0),
		      COUNT(a)
		    )
		    FROM Appointment a
		    where a.consumerId = :consumerId
		    """)
		AnalyticsCount analyticsCount(long consumerId);
	
	
	@Query("""
		    SELECT CASE WHEN COUNT(a) > 0 THEN true ELSE false END
		    FROM Appointment a
		    WHERE a.consumerId = :consumerId
		      AND a.status IN ('REQUESTED', 'ACCEPTED')
		      AND a.startDateTime < :desiredEnd
		      AND a.endDateTime > :desiredStart
		""")
//	AND a.startDateTime >= :dayStart
//	AND a.startDateTime < :dayEnd
		boolean hasCustomerConflict(@Param("consumerId") Long consumerId,
		                            @Param("dayStart") LocalDateTime dayStart,
		                            @Param("dayEnd") LocalDateTime dayEnd,
		                            @Param("desiredStart") LocalDateTime desiredStart,
		                            @Param("desiredEnd") LocalDateTime desiredEnd);

}
