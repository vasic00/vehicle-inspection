package etf.ps.vehicleinspectionstation.services;

import etf.ps.vehicleinspectionstation.dto.*;
import etf.ps.vehicleinspectionstation.enums.VehicleType;
import etf.ps.vehicleinspectionstation.exceptions.BlockedAccException;
import etf.ps.vehicleinspectionstation.exceptions.ForbiddenException;
import etf.ps.vehicleinspectionstation.model.Customer;
import etf.ps.vehicleinspectionstation.model.Worker;

import java.util.List;
import java.util.Map;

public interface ReservationService {
    List<ReservationProposal> getPoposals(long station, VehicleType type,String date);
    List<ProposalEntry> getProposals(VehicleType type, String date);
    AppointmentDto book(CustomerDTO customer,ReservationRequest request) throws ForbiddenException, BlockedAccException;
    List<AppointmentDto> getAppointmentsByStation(long id);
    List<AppointmentDto> getAppointmentsByCompany(long id);
    boolean cancel(CustomerDTO customer, long id);
    boolean cancelByCompany(WorkerDto worker, long id);
    boolean cancelByAdmin(AdminDto admin, long id);
}
