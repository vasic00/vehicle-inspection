package etf.ps.vehicleinspectionstation.model.pricelist;

import lombok.Data;

import java.util.List;

@Data
public class CarsConfig extends VehicleConfig{
    private double ams;
    private double examination;
    private double crash;
    private double waterTax;
    private List<PriceItem> tax;

}
