package etf.ps.vehicleinspectionstation.services;

import etf.ps.vehicleinspectionstation.dto.AdminDto;
import etf.ps.vehicleinspectionstation.dto.WorkerDto;

public interface AdminService {
    AdminDto findByUsername(String username);
}
