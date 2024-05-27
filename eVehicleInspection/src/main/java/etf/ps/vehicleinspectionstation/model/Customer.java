package etf.ps.vehicleinspectionstation.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@Data
@Entity
public class Customer extends AppUser{
    private String phone;
    private String email;
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "owner")
    private List<Vehicle> vehicles;
    private LocalDateTime joined;
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "recipient")
    private List<Message> msgs;
    private int penalties;
}
