package etf.ps.vehicleinspectionstation.controllers;

import com.itextpdf.text.DocumentException;
import etf.ps.vehicleinspectionstation.dto.*;
import etf.ps.vehicleinspectionstation.model.Examination;
import etf.ps.vehicleinspectionstation.services.AuthService;
import etf.ps.vehicleinspectionstation.services.ExaminationService;
import etf.ps.vehicleinspectionstation.services.MapService;
import etf.ps.vehicleinspectionstation.services.impl.ExaminationServiceImpl;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/auth")
public class AuthController {
    private final AuthService authService;
    private final ExaminationServiceImpl examinationService;
    private final MapService mapService;

    public AuthController(AuthService authService, ExaminationServiceImpl examinationService, MapService mapService) {
        this.authService = authService;
        this.examinationService = examinationService;
        this.mapService = mapService;
    }

    @PostMapping
    public ResponseEntity<CustomerDTO> loginCustomer(@RequestBody Credentials credentials) throws Exception {
        CustomerDTO result=authService.loginCustomer(credentials);
        if (result!=null)
            return new ResponseEntity<>(result, HttpStatus.OK);
        else
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }
    @PostMapping("/workers")
    public ResponseEntity<AppUserDto> loginWorker(@RequestBody Credentials credentials) throws Exception {
        AppUserDto result=authService.loginWorker(credentials);
        if (result!=null)
            return new ResponseEntity<>(result, HttpStatus.OK);
        else
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }
    @PostMapping("/signup")
    public ResponseEntity<CustomerDTO> signupCustomer(@RequestBody CustomerDTO user){
        CustomerDTO result=authService.signupCustomer(user);
        if (result!=null)
            return new ResponseEntity<>(result, HttpStatus.OK);
        else
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }
}
