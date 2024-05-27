package etf.ps.vehicleinspectionstation.dto;

import etf.ps.vehicleinspectionstation.enums.EngineType;
import etf.ps.vehicleinspectionstation.enums.VehicleType;
import lombok.Data;

import java.util.List;
@Data
public class VehicleInfo {
    private long id;
    private long owner;
    private String ownerName;
    private VehicleType type;
    private int productionYear;
    private EngineType engine;
    private int emissionClass;
    private String manufacturer;
    private String model;
    private String color;
    private double malus;
    private int enginePower;
    private int engineVolume;
    private int mass;
    private int loadMax;
}
