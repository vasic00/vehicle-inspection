package etf.ps.vehicleinspectionstation.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class Grade {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private int grade;
    @ManyToOne
    @JoinColumn(name="company",referencedColumnName = "id",nullable = false)
    private Company company;
}
