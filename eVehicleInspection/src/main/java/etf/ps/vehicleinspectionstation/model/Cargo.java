package etf.ps.vehicleinspectionstation.model;

import jakarta.persistence.Entity;
import lombok.Data;

@Data
@Entity
public class Cargo extends Vehicle {
    private int mass;
    private int loadMax;
}
