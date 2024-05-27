package etf.ps.vehicleinspectionstation.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;
import java.util.Objects;

@Data
@Entity
public class ExaminationLine {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String name;
    @ManyToOne
    @JoinColumn(name="station",referencedColumnName = "id",nullable = false)
    private InspectionStation inspectionStation;
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "line")
    private List<Appointment> appointments;
    private boolean deleted;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ExaminationLine that = (ExaminationLine) o;
        return id == that.id;
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
