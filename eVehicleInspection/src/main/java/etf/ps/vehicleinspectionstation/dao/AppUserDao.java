package etf.ps.vehicleinspectionstation.dao;

import etf.ps.vehicleinspectionstation.dto.AppUserDto;
import etf.ps.vehicleinspectionstation.model.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AppUserDao extends JpaRepository<AppUser,Long> {
    AppUser findByUsername(String username);
}
