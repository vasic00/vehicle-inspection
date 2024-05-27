package etf.ps.vehicleinspectionstation.dto;

import lombok.Data;

@Data
public class CalculatorBikeRequest extends CalculatorRequest{
    private int year;

    @Override
    public String toString() {
        return "CalculatorBikeRequest{" +
                "year=" + year +
                "} " + super.toString();
    }
}
