package etf.ps.vehicleinspectionstation.model.pricelist;

import lombok.Data;

import java.util.List;

@Data
public class PriceList {
    private int timeStep;
    private int penaltiesThreshold;
    private CarsConfig cars;
    private CargoConfig cargo;
    private BikeConfig bikes;
    private EcoTaxConfig ecoTax;
    private String currency;
    private List<String> criteria;
}
