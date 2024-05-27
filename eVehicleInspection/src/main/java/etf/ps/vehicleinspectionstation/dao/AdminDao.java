package etf.ps.vehicleinspectionstation.dao;

import etf.ps.vehicleinspectionstation.model.Admin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdminDao extends JpaRepository<Admin,Long> {
    Admin findAdminByUsername(String username);
}
