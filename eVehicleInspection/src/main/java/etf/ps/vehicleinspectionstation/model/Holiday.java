package etf.ps.vehicleinspectionstation.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Data
@Entity
public class Holiday {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private LocalDate holidayDate;
    @ManyToOne
    @JoinColumn(name = "company",referencedColumnName = "id", nullable = false)
    private Company company;
}
