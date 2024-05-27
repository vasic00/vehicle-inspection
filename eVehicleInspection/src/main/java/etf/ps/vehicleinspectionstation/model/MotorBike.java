package etf.ps.vehicleinspectionstation.model;

import jakarta.persistence.Entity;
import lombok.Data;

@Data
@Entity
public class MotorBike extends Vehicle{
    private int engineVolume;
}
