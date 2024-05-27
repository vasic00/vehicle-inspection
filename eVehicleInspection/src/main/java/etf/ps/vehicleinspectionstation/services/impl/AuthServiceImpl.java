package etf.ps.vehicleinspectionstation.services.impl;

import etf.ps.vehicleinspectionstation.dto.*;
import etf.ps.vehicleinspectionstation.enums.Role;
import etf.ps.vehicleinspectionstation.security.JwtUtil;
import etf.ps.vehicleinspectionstation.services.AuthService;
import etf.ps.vehicleinspectionstation.services.CustomerService;
import etf.ps.vehicleinspectionstation.services.WorkerService;
import etf.ps.vehicleinspectionstation.util.CustomLogger;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements AuthService {
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final CustomerService customerService;
    private final WorkerService workerService;
    private final BCryptPasswordEncoder encoder;
    private final CustomLogger logger;

    public AuthServiceImpl(AuthenticationManager authenticationManager, JwtUtil jwtUtil, CustomerService customerService, WorkerService workerService, BCryptPasswordEncoder encoder, CustomLogger logger) {
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
        this.customerService = customerService;
        this.workerService = workerService;
        this.encoder = encoder;
        this.logger = logger;
    }

    public AppUserDto authenticate(Credentials credentials) throws Exception {
        try{
            Authentication authenticate = authenticationManager
                    .authenticate(
                            new UsernamePasswordAuthenticationToken(
                                    credentials.getUsername(), credentials.getPassword()
                            )
                    );
            AppUserDto appUser = (AppUserDto) authenticate.getPrincipal();
            if (appUser == null || appUser.isBlocked()){
                logger.log("Access forbidden("+credentials.getUsername()+":****)!",true);
                return null;
            }
            else return appUser;
        }catch (Exception e){
            logger.log("Invalid credentials ("+credentials.getUsername()+":****)!",true);
            logger.logException(e,true);
            throw e;
        }
    }

    @Override
    public CustomerDTO loginCustomer(Credentials credentials) throws Exception {
        AppUserDto appUserDto = authenticate(credentials);
        CustomerDTO customerDTO = customerService.findById(appUserDto.getId());
        if (customerDTO != null) {
            String token = jwtUtil.generateToken(customerDTO, Role.CUSTOMER);
            customerDTO.setToken(token);
            return customerDTO;
        } else return null;
    }

    @Override
    public AppUserDto loginWorker(Credentials credentials) throws Exception {
        AppUserDto appUserDto = authenticate(credentials);
        WorkerDto workerDto = workerService.findById(appUserDto.getId());
        if (workerDto != null) {
            String token = jwtUtil.generateToken(workerDto, Role.WORKER);
            workerDto.setToken(token);
            return workerDto;
        } else{
            AdminDto admin=workerService.findAdminById(appUserDto.getId());
            if(admin!=null) {
                admin.setToken(jwtUtil.generateToken(admin, Role.ADMIN));
                return admin;
            }
        }
        return null;
    }

    @Override
    public CustomerDTO signupCustomer(CustomerDTO customer) {
        if (customerService.checkIfUsernameIsTaken(customer.getUsername()))
            return null;
        else{
            CustomerDTO result=customerService.addCustomer(customer);
            String token = jwtUtil.generateToken(result, Role.CUSTOMER);
            result.setToken(token);
            return result;
        }
    }
}
