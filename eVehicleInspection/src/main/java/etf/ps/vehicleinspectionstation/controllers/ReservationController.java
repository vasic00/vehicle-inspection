package etf.ps.vehicleinspectionstation.controllers;

import etf.ps.vehicleinspectionstation.dto.*;
import etf.ps.vehicleinspectionstation.enums.VehicleType;
import etf.ps.vehicleinspectionstation.exceptions.BlockedAccException;
import etf.ps.vehicleinspectionstation.exceptions.ForbiddenException;
import etf.ps.vehicleinspectionstation.model.AppUser;
import etf.ps.vehicleinspectionstation.services.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/reservations")
public class ReservationController {
    private final ReservationService reservationService;
    private final CustomerService customerService;
    private final WorkerService workerService;
    private final AdminService adminService;

    public ReservationController(ReservationService reservationService, AppUserService appUserService, CustomerService customerService, WorkerService workerService, AdminService adminService) {
        this.reservationService = reservationService;
        this.customerService = customerService;
        this.workerService = workerService;
        this.adminService = adminService;
    }

    @GetMapping("/{station}/{type}/{date}")
    public ResponseEntity<List<ReservationProposal>> getProposals(@PathVariable("type") String type, @PathVariable("station") long station, @PathVariable("date") String date) {
        try {
            return new ResponseEntity<>(reservationService.getPoposals(station, VehicleType.valueOf(type), date), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/{type}/{date}")
    public ResponseEntity<List<ProposalEntry>> getProposals(@PathVariable("type") String type, @PathVariable("date") String date) {
        try {
            return new ResponseEntity<>(reservationService.getProposals(VehicleType.valueOf(type), date), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping
    public ResponseEntity<AppointmentDto> book(@RequestBody ReservationRequest request) {
        CustomerDTO customerDTO = getCustomerFromSecurityContext();
        if (customerDTO != null) {
            try {
                AppointmentDto result = reservationService.book(customerDTO, request);
                if (result != null)
                    return new ResponseEntity<>(result, HttpStatus.OK);
                else
                    return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            } catch (ForbiddenException e) {
                return new ResponseEntity<>(HttpStatus.FORBIDDEN);
            } catch (BlockedAccException ee){
                return  new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PutMapping("/cancel/{id}")
    public ResponseEntity cancel(@PathVariable("id") long id) {
        CustomerDTO customerDTO = getCustomerFromSecurityContext();
        if (customerDTO != null)
            return new ResponseEntity(reservationService.cancel(customerDTO, id) ? HttpStatus.OK : HttpStatus.NOT_FOUND);
        else return new ResponseEntity(HttpStatus.NOT_FOUND);
    }

    @PutMapping("/company/cancel/{id}")
    public ResponseEntity cancelByCompany(@PathVariable("id") long id) {
        WorkerDto workerDto = getWorkerFromSecurityContext();
        if (workerDto != null)
            return new ResponseEntity(reservationService.cancelByCompany(workerDto, id) ? HttpStatus.OK : HttpStatus.NOT_FOUND);
        else return new ResponseEntity(HttpStatus.NOT_FOUND);
    }

    @PutMapping("/admin/cancel/{id}")
    public ResponseEntity cancelByAdmin(@PathVariable("id") long id) {
        AdminDto adminDto = getAdminFromSecurityContext();
        if (adminDto != null)
            return new ResponseEntity(reservationService.cancelByAdmin(adminDto,id) ? HttpStatus.OK : HttpStatus.NOT_FOUND);
        else return new ResponseEntity(HttpStatus.NOT_FOUND);
    }


    @GetMapping("/stations/{id}")
    public ResponseEntity<List<AppointmentDto>> getReservationsByStation(@PathVariable long id) {
        List<AppointmentDto> result = reservationService.getAppointmentsByStation(id);
        if (result == null)
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        else return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @GetMapping("/companies/{id}")
    public ResponseEntity<List<AppointmentDto>> getReservationByCompany(@PathVariable long id){
        List<AppointmentDto> result = reservationService.getAppointmentsByCompany(id);
        if (result == null)
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        else return new ResponseEntity<>(result, HttpStatus.OK);
    }

    private String getUsernameFromSecurityContext() {
        SecurityContext securityContext = SecurityContextHolder.getContext();
        Authentication authentication = securityContext.getAuthentication();
        if (authentication != null && authentication.isAuthenticated()) {
            Object principal = authentication.getPrincipal();
            if (principal instanceof UserDetails userDetails)
                return userDetails.getUsername();
        }
        return null;
    }

    private WorkerDto getWorkerFromSecurityContext() {
        String username = getUsernameFromSecurityContext();
        if (username != null)
            return workerService.findByUsername(username);
        else
            return null;
    }

    private CustomerDTO getCustomerFromSecurityContext() {
        String username = getUsernameFromSecurityContext();
        if (username != null)
            return customerService.findByUsername(username);
        else
            return null;
    }
    private AdminDto getAdminFromSecurityContext() {
        String username = getUsernameFromSecurityContext();
        if (username != null)
            return adminService.findByUsername(username);
        else
            return null;
    }


}
