package etf.ps.vehicleinspectionstation.dto;

import lombok.Data;

@Data
public class CalculatorRequest {
    private String type;
    private String engine;
    private int engineClass;
    private int volume;
    private boolean registration;
    private boolean first;
    private boolean regCert;
    private boolean ownerCert;
    private boolean greenCard;
    private boolean newPlates;
    private double malus;
    private long vehicle;
    @Override
    public String toString() {
        return "CalculatorRequest{" +
                "type='" + type + '\'' +
                ", engine='" + engine + '\'' +
                ", engineClass=" + engineClass +
                ", volume=" + volume +
                ", first=" + first +
                ", regCert=" + regCert +
                ", ownerCert=" + ownerCert +
                ", greenCard=" + greenCard +
                ", newPlates=" + newPlates +
                '}';
    }
}
