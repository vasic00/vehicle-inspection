package etf.ps.vehicleinspectionstation.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Entity
@Data
public class Vacation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private LocalDate date;
    @ManyToOne
    @JoinColumn(name="worker",referencedColumnName = "id",nullable = false)
    private Worker worker;
}
