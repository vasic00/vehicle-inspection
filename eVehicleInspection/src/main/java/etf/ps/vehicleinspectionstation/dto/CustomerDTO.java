package etf.ps.vehicleinspectionstation.dto;

import etf.ps.vehicleinspectionstation.model.Vehicle;
import jakarta.persistence.FetchType;
import jakarta.persistence.OneToMany;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@Data
public class CustomerDTO  extends AppUserDto{
    private String phone;
    private String email;
    private List<VehicleDTO> vehicles;
    private LocalDateTime joined;
    private String token;
    private List<MessageDto> msgs;
    private List<AppointmentDto> appointments;
    private int examinations;
    private String lastExamintation;
    private double averageCost;
    private int penalties;
}
