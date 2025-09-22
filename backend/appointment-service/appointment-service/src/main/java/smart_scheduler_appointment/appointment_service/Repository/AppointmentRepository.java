package smart_scheduler_appointment.appointment_service.Repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import smart_scheduler_appointment.appointment_service.Dto.AnalyticsCount;
import smart_scheduler_appointment.appointment_service.Dto.UnAvailableTime;
import smart_scheduler_appointment.appointment_service.Entitys.Appointment;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
	
//	@Query("""
//			SELECT a FROM Appointment JOIN 
//			""")
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
			  AND (:updateAppId is null or a.uid != :updateAppId)
		""")
//	AND a.startDateTime >= :dayStart
//	AND a.startDateTime < :dayEnd
		boolean hasCustomerConflict(@Param("consumerId") Long consumerId,
		                            @Param("desiredStart") LocalDateTime desiredStart,
		                            @Param("desiredEnd") LocalDateTime desiredEnd,
		                            @Param("updateAppId") String updateAppId);

	@Query("""
		    SELECT new smart_scheduler_appointment.appointment_service.Dto.UnAvailableTime(
		        a.startDateTime,
		        a.endDateTime
		    )
		    FROM Appointment a
		    WHERE a.providerId = :providerId
		      AND a.consumerId = :consumerId
		      AND DATE(a.startDateTime) = :date
		      AND a.status IN ('ACCEPTED',COMPLETED)
		""")
		List<UnAvailableTime> getUnAvailableTime(Long consumerId, Long providerId, LocalDate date);

	Optional<Appointment> findByUid(String appointmentId);

}
