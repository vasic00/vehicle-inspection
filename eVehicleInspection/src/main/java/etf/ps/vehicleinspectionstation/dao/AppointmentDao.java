package etf.ps.vehicleinspectionstation.dao;

import etf.ps.vehicleinspectionstation.model.Appointment;
import etf.ps.vehicleinspectionstation.model.InspectionStation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface AppointmentDao extends JpaRepository<Appointment,Long> {
    List<Appointment> findAppointmentsByLineInspectionStationAndStartsAtAfterAndStartsAtBeforeAndCanceled(InspectionStation inspectionStation, LocalDateTime dateTime1, LocalDateTime dateTime2,boolean canceled);
    List<Appointment> findAppointmentsByStartsAtAfterAndStartsAtBeforeAndCanceled(LocalDateTime dateTime1, LocalDateTime dateTime2,boolean canceled);
    List<Appointment> findAppointmentsByLineInspectionStationId(long id);
    List<Appointment> findAppointmentsByLineInspectionStationCompanyId(long id);
    List<Appointment> findAppointmentsByVehicleOwnerId(long id);
}
