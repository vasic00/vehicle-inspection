package etf.ps.vehicleinspectionstation.model;

import etf.ps.vehicleinspectionstation.enums.EngineType;
import etf.ps.vehicleinspectionstation.enums.Status;
import etf.ps.vehicleinspectionstation.enums.VehicleType;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.Date;

@Data
@Entity
public class Examination {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @ManyToOne
    @JoinColumn(name="vehicle",referencedColumnName = "id",nullable = false)
    private Vehicle vehicle;
    @ManyToOne
    @JoinColumn(name="supervisor",referencedColumnName = "id",nullable = false)
    private Worker supervisor;
    private LocalDateTime time;
    @ManyToOne
    @JoinColumn(name="line", referencedColumnName = "id",nullable = false)
    private ExaminationLine line;
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name="record",referencedColumnName = "id")
    private ExaminationRecord record;
    private double price;
    private boolean registration;
    private boolean newPlates;
    private boolean first;
    private boolean ownerCert;
    private boolean regCert;
    private boolean greenCard;
    private String period;
    private String licencePlates;
    @Enumerated(value = EnumType.STRING)
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
