package etf.ps.vehicleinspectionstation.model.pricelist;

import lombok.Data;

import java.util.List;

@Data
public class CargoConfig extends VehicleConfig{
    private double ams;
    private List<PriceItem> examination;
    private List<PriceItem> waterTax;
    private int roadTaxMLimit;
    private double roadTaxStep;
    private double roadTaxLimitPrice;
    private int roadTaxMStep;
}
