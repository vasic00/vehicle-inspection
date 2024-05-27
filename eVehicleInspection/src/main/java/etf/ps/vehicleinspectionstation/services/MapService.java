package etf.ps.vehicleinspectionstation.services;

import etf.ps.vehicleinspectionstation.dto.*;
import etf.ps.vehicleinspectionstation.model.*;

public interface MapService {
    ExaminationDto map(Examination examination,boolean flag);
    VehicleDTO map(Vehicle vehicle,boolean flag);
    AppointmentDto map(Appointment a);

    public CompanyDto map(Company company);
    public WorkerDto map(Worker worker, boolean flag);
}
