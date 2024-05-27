package etf.ps.vehicleinspectionstation.model;

import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@Entity
public class InspectionStation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @ManyToOne
    @JoinColumn(name="company",referencedColumnName = "id",nullable = false)
    private Company company;
    private String name;
    private String phone;
    private String address;
    private String email;
    private boolean deleted;
    @Nullable
    private int startsAt;
    @Nullable
    private int endsAt;
    @OneToMany(fetch = FetchType.LAZY,mappedBy = "inspectionStation")
    private List<ExaminationLine> lines;
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "station")
    private List<Worker> workers;
}
