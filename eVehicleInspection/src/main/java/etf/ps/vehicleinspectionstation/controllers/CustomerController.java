package etf.ps.vehicleinspectionstation.controllers;

import etf.ps.vehicleinspectionstation.dto.CustomerDTO;
import etf.ps.vehicleinspectionstation.services.CustomerService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/customers")
public class CustomerController {
    private final CustomerService customerService;

    public CustomerController(CustomerService customerService) {
        this.customerService = customerService;
    }

    @PutMapping("/data/{id}")
    public ResponseEntity<?> updateCustomerData(@RequestBody CustomerDTO customerDTO, @PathVariable long id) {
        // check user
        return new ResponseEntity<>(customerService.changeCustomerData(customerDTO) ? HttpStatus.OK : HttpStatus.NOT_FOUND);
    }
}
