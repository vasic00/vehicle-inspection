package etf.ps.vehicleinspectionstation.model.pricelist;

import lombok.Data;

import java.util.List;
@Data
public class VehicleConfig {
    private List<PriceItem> insurance;
    private List<PriceItem> roadsTax;
    private double sticker;
    private double regCert;
    private double ownerCert;
    private double newPlates;
    private double greenCard;
    private double stateTaxFirst;
    private double stateTax;
    private double sup;
    private double ageTaxDecrease;
    private int maxAge;
    private int duration;
}
