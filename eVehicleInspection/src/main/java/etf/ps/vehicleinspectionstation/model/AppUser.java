package etf.ps.vehicleinspectionstation.model;

import jakarta.persistence.*;
import lombok.Data;

import etf.ps.vehicleinspectionstation.enums.Role;

@Data
@Entity
@Inheritance(strategy = InheritanceType.JOINED)
public class AppUser {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String username;
    private String password;
    private String firstname;
    private String lastname;
    private boolean blocked;
    private boolean deleted;
    @Enumerated(EnumType.STRING)
    private Role role;

}