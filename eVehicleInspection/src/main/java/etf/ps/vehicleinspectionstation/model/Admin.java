package etf.ps.vehicleinspectionstation.model;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;

@Entity
@Data
public class Admin extends  AppUser{
    @ManyToOne
    @JoinColumn(name="company",referencedColumnName = "id",nullable = false)
    private Company company;
}
