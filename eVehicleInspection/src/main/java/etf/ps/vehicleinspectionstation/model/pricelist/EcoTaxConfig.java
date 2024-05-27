package etf.ps.vehicleinspectionstation.model.pricelist;

import lombok.Data;

import java.util.List;

@Data
public class EcoTaxConfig {
    private List<PerCriteriaData<PerCriteriaData<PriceItem>>> data;
}
