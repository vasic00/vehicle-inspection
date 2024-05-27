package etf.ps.vehicleinspectionstation.dto;

import lombok.Data;

@Data
public class CalculatorCargoRequest extends CalculatorRequest {
    private int mass;
    private int load;

    @Override
    public String toString() {
        return "CalculatorCargoRequest{" +
                "mass=" + mass +
                ", load=" + load +
                "} " + super.toString();
    }
}
