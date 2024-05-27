package etf.ps.vehicleinspectionstation.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import etf.ps.vehicleinspectionstation.enums.Status;

@Data
@Entity
public class Appointment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private LocalDateTime startsAt;
    private LocalDateTime endsAt;
    @ManyToOne
    @JoinColumn(name="line", referencedColumnName = "id",nullable = false)
    private ExaminationLine line;
    private double price;
    private boolean registration;
    private boolean newPlates;
    private boolean first;
    private boolean ownerCert;
    private boolean regCert;
    private boolean greenCard;
    private LocalDateTime created;
    private boolean canceled;
    @Enumerated(EnumType.STRING)
    private Status status;
    @ManyToOne
    @JoinColumn(name="vehicle", referencedColumnName = "id",nullable = false)
    private Vehicle vehicle;
}
