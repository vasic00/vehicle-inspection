package etf.ps.vehicleinspectionstation.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class Criteria {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String name;
    private boolean satisfied;
    private String description;
    @ManyToOne
    @JoinColumn(name="record",referencedColumnName = "id",nullable = false)
    private ExaminationRecord record;
}
