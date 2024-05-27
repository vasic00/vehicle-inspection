package etf.ps.vehicleinspectionstation.services.impl;

import etf.ps.vehicleinspectionstation.dao.AppointmentDao;
import etf.ps.vehicleinspectionstation.dao.CustomerDao;
import etf.ps.vehicleinspectionstation.dto.*;
import etf.ps.vehicleinspectionstation.enums.Role;
import etf.ps.vehicleinspectionstation.enums.Status;
import etf.ps.vehicleinspectionstation.model.Appointment;
import etf.ps.vehicleinspectionstation.model.Customer;
import etf.ps.vehicleinspectionstation.model.Vehicle;
import etf.ps.vehicleinspectionstation.model.pricelist.PriceList;
import etf.ps.vehicleinspectionstation.services.CustomerService;
import etf.ps.vehicleinspectionstation.services.MapService;
import etf.ps.vehicleinspectionstation.services.ReservationService;
import etf.ps.vehicleinspectionstation.services.VehicleService;
import etf.ps.vehicleinspectionstation.util.CustomLogger;
import org.modelmapper.ModelMapper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.swing.text.html.Option;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class CustomerServiceImpl implements CustomerService {
    private final CustomerDao customerDao;
    private final AppointmentDao appointmentDao;
    private final MapService mapService;
    private final PriceList priceList;
    private final ModelMapper modelMapper;
    private final PasswordEncoder encoder;
    private final CustomLogger logger;

    public CustomerServiceImpl(CustomerDao customerDao, AppointmentDao appointmentDao, MapService mapService, PriceList priceList, ModelMapper modelMapper, PasswordEncoder encoder, CustomLogger logger) {
        this.customerDao = customerDao;
        this.appointmentDao = appointmentDao;
        this.mapService = mapService;
        this.priceList = priceList;
        this.modelMapper = modelMapper;
        this.encoder = encoder;
        this.logger = logger;
    }

    @Override
    public CustomerDTO findByUsername(String username) {
        Customer customer=customerDao.findByUsername(username);
        if (customer!=null)
            return map(customer);
        else return null;
    }
    CustomerDTO map(Customer customer){
        List<Vehicle> vehicles=customer.getVehicles();
        customer.setVehicles(null);
        CustomerDTO dto=modelMapper.map(customer,CustomerDTO.class);
        dto.setAppointments(getAppointments(customer.getId()));
        int examinations=vehicles.stream().map(v -> v.getExaminations().size()).reduce(0, (a,b)-> a+b);
        dto.setExaminations(examinations);
        dto.setAverageCost(vehicles.stream().map(v -> v.getExaminations().stream().map(e -> e.getPrice()).reduce(0.0,(a,b)-> a+b)).reduce(0.0,(a,b)-> a+b)/(examinations>0?examinations:1));
        dto.setMsgs(customer.getMsgs().stream().map(m -> { MessageDto msg=modelMapper.map(m, MessageDto.class); msg.setRead(m.is_read()); return msg;}).sorted((m1,m2)->m1.getTime().before(m2.getTime())?1:-1).toList());
        dto.setVehicles(vehicles.stream().filter(v -> !v.isDeleted()).map(m -> mapService.map(m,true)).toList());
        return dto;
    }
    @Override
    public CustomerDTO findById(long id) {
        Optional<Customer> customer=customerDao.findById(id);
        if (customer.isPresent())
            return map(customer.get());
        else{
            logger.log("Invalid user id ("+id+")!",false);
            return null;
        }
    }

    @Override
    public boolean checkIfUsernameIsTaken(String username) {
        CustomerDTO customer=findByUsername(username);
        if(customer==null)
            return false;
        else{
            logger.log("Username taken ("+username+")!",false);
            return true;
        }
    }

    @Override
    public CustomerDTO addCustomer(CustomerDTO customer) {
        customer.setPassword(encoder.encode(customer.getPassword()));
        customer.setBlocked(false);
        customer.setJoined(LocalDateTime.now());
        customer.setPenalties(0);
        customer.setRole(Role.CUSTOMER);
        Customer entity=customerDao.saveAndFlush(modelMapper.map(customer,Customer.class));
        customer.setId(entity.getId());
        customer.setPassword("***");
        customer.setMsgs(new ArrayList<>());
        customer.setVehicles(new ArrayList<>());
        customer.setAverageCost(0);
        customer.setExaminations(0);
        customer.setAppointments(new ArrayList<>());
        return  customer;
    }

    @Override
    public boolean changeCustomerData(CustomerDTO customerDTO) {
        Optional<Customer> customer=customerDao.findById(customerDTO.getId());
        if (customer.isPresent()){
            customer.get().setEmail(customerDTO.getEmail());
            customer.get().setPhone(customerDTO.getPhone());
            customer.get().setFirstname(customerDTO.getFirstname());
            customer.get().setLastname(customerDTO.getLastname());
            customerDao.saveAndFlush(customer.get());
            return true;
        }else{
            logger.log("Invalid user id ("+customerDTO.getId()+")!",true);
            return false;
        }
    }
    @Override
    public boolean addPenalty(long id){
        Optional<Customer> customer=customerDao.findById(id);
        if(customer.isPresent()){
            customer.get().setPenalties(customer.get().getPenalties()+1);
            customerDao.saveAndFlush(customer.get());
            return true;
        }
        return false;
    }
    @Override
    public boolean blocked(long id){
        Optional<Customer> customer=customerDao.findById(id);
        if(customer.isPresent()){
            if(customer.get().getPenalties()>priceList.getPenaltiesThreshold())
                return true;
        }
        return false;
    }
    private List<AppointmentDto> getAppointments(long customer) {
        List<Appointment> entities = appointmentDao.findAppointmentsByVehicleOwnerId(customer);
        return entities.stream().map(a -> {
            AppointmentDto dto = mapService.map(a);
            if (dto.getStartsAt().isBefore(LocalDateTime.now()) && dto.getStatus().equals(Status.BOOKED.name())) {
                dto.setCanceled(true);
                dto.setStatus(Status.CANCELED.name());
            }
            return dto;
        }).sorted((a1, a2) -> {
            return a1.getStartsAt().isBefore(a2.getStartsAt()) ? 1 : -1;
        }).toList();
    }
}
