package etf.ps.vehicleinspectionstation.dto;

import etf.ps.vehicleinspectionstation.enums.EngineType;
import etf.ps.vehicleinspectionstation.enums.VehicleType;
import etf.ps.vehicleinspectionstation.model.ExaminationLine;
import etf.ps.vehicleinspectionstation.model.ExaminationRecord;
import etf.ps.vehicleinspectionstation.model.Vehicle;
import etf.ps.vehicleinspectionstation.model.Worker;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
@Data
public class ExaminationDto {
    private long id;
    private String supervisor;
    private long supervisorId;
    private LocalDateTime time;
    private String period;
    private ExaminationRecordDto record;
    private double price;
    private boolean registration;
    private boolean newPlates;
    private boolean first;
    private boolean ownerCert;
    private boolean regCert;
    private boolean greenCard;
    private VehicleInfo vehicle;
    private String line;
    private long lineId;
    private String company;
    private String station;
    private long reservationId;
    private String licencePlates;
    private VehicleType type;
    private int productionYear;
    private EngineType engine;
    private int emissionClass;
    private String manufacturer;
    private String model;
    private String color;
    private double malus;
    private int enginePower;
    private boolean lpg;
    private int engineVolume;
    private int mass;
    private int loadMax;
}
