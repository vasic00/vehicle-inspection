package etf.ps.vehicleinspectionstation.model;

import jakarta.persistence.Entity;
import lombok.Data;

@Data
@Entity
public class Car extends Vehicle{
    private int enginePower;
    private boolean lpg;
    private int engineVolume;
}
