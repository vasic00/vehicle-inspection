package etf.ps.vehicleinspectionstation.dto;

import etf.ps.vehicleinspectionstation.enums.EngineType;
import etf.ps.vehicleinspectionstation.enums.VehicleType;
import etf.ps.vehicleinspectionstation.model.Appointment;
import etf.ps.vehicleinspectionstation.model.Customer;
import etf.ps.vehicleinspectionstation.model.Examination;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data
public class VehicleDTO {
    private long id;
    private long owner;
    private String ownerName;
    private List<ExaminationDto> examinations;
    private VehicleType type;
    private int productionYear;
    private EngineType engine;
    private int emissionClass;
    private String manufacturer;
    private String model;
    private String color;
    private double malus;
    private boolean deleted;
}
