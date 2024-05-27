package etf.ps.vehicleinspectionstation.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

import etf.ps.vehicleinspectionstation.model.Grade;
@Data
@Entity
public class Company {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String name;
    private String address;
    private String email;
    private String phone;
    private String description;
    @Nullable
    private String logo;
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "company")
    private List<InspectionStation> stations;
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "company")
    private List<Admin> admins;
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "company")
    private List<Grade> grades;
    private boolean active;
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "company")
    private List<Holiday> holidays;
}
