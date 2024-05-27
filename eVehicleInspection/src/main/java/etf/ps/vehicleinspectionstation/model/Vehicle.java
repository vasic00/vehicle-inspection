package etf.ps.vehicleinspectionstation.model;

import etf.ps.vehicleinspectionstation.enums.EngineType;
import etf.ps.vehicleinspectionstation.enums.VehicleType;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@Data
@Entity
@Inheritance(strategy = InheritanceType.JOINED)
public class Vehicle {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @ManyToOne
    @JoinColumn(name="owner",referencedColumnName = "id",nullable = false)
    private Customer owner;
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "vehicle")
    private List<Examination> examinations;
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "vehicle")
    private List<Appointment> appointments;
    @Enumerated(EnumType.STRING)
    private VehicleType type;
    private int productionYear;
    @Enumerated(EnumType.STRING)
    private EngineType engine;
    private int emissionClass;
    private String manufacturer;
    private String model;
    private String color;
    private double malus;
    private boolean deleted;
}
