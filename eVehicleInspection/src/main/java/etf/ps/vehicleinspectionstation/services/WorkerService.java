package etf.ps.vehicleinspectionstation.services;

import etf.ps.vehicleinspectionstation.dto.AdminDto;
import etf.ps.vehicleinspectionstation.dto.VacationDto;
import etf.ps.vehicleinspectionstation.dto.WorkerDto;
import etf.ps.vehicleinspectionstation.model.Worker;

import java.time.LocalDate;

public interface WorkerService {
    WorkerDto findById(long id);
    WorkerDto findByUsername(String username);
    AdminDto findAdminById(long id);
    VacationDto addVacation(long id, LocalDate date);
    boolean removeVacation(long id);
    boolean blockUser(long id, boolean block);
    boolean delete(long id);
    boolean changeLocation(long id, long station);
}
