package etf.ps.vehicleinspectionstation.dao;

import etf.ps.vehicleinspectionstation.model.Cargo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CargoDao extends JpaRepository<Cargo,Long> {
}
