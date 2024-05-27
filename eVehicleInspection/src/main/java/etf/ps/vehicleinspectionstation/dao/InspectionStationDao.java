package etf.ps.vehicleinspectionstation.dao;

import etf.ps.vehicleinspectionstation.model.Company;
import etf.ps.vehicleinspectionstation.model.InspectionStation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface InspectionStationDao extends JpaRepository<InspectionStation,Long> {
    List<InspectionStation> findAllByCompany(Company company);
}
