package etf.ps.vehicleinspectionstation.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Cost {
    private double value;
    private String currency;
    private double malus;
}
