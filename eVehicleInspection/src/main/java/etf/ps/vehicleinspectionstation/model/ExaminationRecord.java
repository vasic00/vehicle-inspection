package etf.ps.vehicleinspectionstation.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@Entity
public class ExaminationRecord {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String description;
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "record")
    private List<Criteria> criteria;
    @OneToOne (mappedBy = "record")
    private Examination examination;
}
