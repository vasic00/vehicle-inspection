package etf.ps.vehicleinspectionstation.dto;

import lombok.Data;

@Data
public class CargoDto extends VehicleDTO{
    private int mass;
    private int loadMax;
}
