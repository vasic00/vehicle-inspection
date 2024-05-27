package etf.ps.vehicleinspectionstation.services;

import etf.ps.vehicleinspectionstation.dto.AppUserDto;
import etf.ps.vehicleinspectionstation.dto.Credentials;
import etf.ps.vehicleinspectionstation.dto.CustomerDTO;
import etf.ps.vehicleinspectionstation.dto.WorkerDto;

public interface AuthService {
    CustomerDTO loginCustomer(Credentials credentials) throws Exception;
    AppUserDto loginWorker(Credentials credentials) throws Exception;
    CustomerDTO signupCustomer(CustomerDTO customer);
}
