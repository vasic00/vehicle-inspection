package etf.ps.vehicleinspectionstation.model.pricelist;

import lombok.Data;

import java.util.List;

@Data
public class PerCriteriaData<T> {
    private String criteria;
    private List<T> data;
}
