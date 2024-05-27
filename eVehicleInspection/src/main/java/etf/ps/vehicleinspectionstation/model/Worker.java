package etf.ps.vehicleinspectionstation.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@Entity
public class Worker extends  AppUser{
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "supervisor")
    private List<Examination> supervised;
    @ManyToOne
    @JoinColumn(name="station",referencedColumnName = "id",nullable = false)
    private InspectionStation station;
    @OneToMany(fetch = FetchType.LAZY,mappedBy = "worker")
    private List<Vacation> vacation;
    private int vacationLimit;
}
