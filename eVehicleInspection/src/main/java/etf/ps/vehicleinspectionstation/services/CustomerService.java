package etf.ps.vehicleinspectionstation.services;

import etf.ps.vehicleinspectionstation.dto.CustomerDTO;
public interface CustomerService {
    CustomerDTO findById(long id);
    CustomerDTO findByUsername(String username);
    boolean checkIfUsernameIsTaken(String username);
    CustomerDTO addCustomer(CustomerDTO customer);
    boolean changeCustomerData(CustomerDTO customerDTO);
    boolean addPenalty(long id);
    boolean blocked(long id);
}
