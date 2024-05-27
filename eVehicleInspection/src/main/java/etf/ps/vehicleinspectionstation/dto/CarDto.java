package etf.ps.vehicleinspectionstation.dto;

import lombok.Data;

@Data
public class CarDto  extends  VehicleDTO{
    private int enginePower;
    private boolean lpg;
    private int engineVolume;
}
