package etf.ps.vehicleinspectionstation.dao;

import etf.ps.vehicleinspectionstation.model.Company;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CompanyDao extends JpaRepository<Company,Long> {
    List<Company> findAllByActive(boolean active);
}
