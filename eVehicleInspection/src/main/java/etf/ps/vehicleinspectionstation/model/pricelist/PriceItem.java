package etf.ps.vehicleinspectionstation.model.pricelist;

import lombok.Data;

@Data
public class PriceItem {
    private double price;
    private double lower_limit;
    private double upper_limit;
}
