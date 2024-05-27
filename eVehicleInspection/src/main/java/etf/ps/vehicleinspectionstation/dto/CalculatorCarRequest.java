package etf.ps.vehicleinspectionstation.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
public class CalculatorCarRequest extends CalculatorRequest{
    private int power;
    private int year;

    @Override
    public String toString() {
        return super.toString()+
                "CalculatorCarRequest{" +
                "power=" + power +
                ", year=" + year +
                '}';
    }
}
