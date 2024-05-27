package etf.ps.vehicleinspectionstation.model.pricelist;

import lombok.Data;
import java.util.List;

@Data
public class BikeConfig extends VehicleConfig{
    private List<PriceItem> tax;
    private List<PriceItem> examination;
    private List<PriceItem> waterTax;
}
