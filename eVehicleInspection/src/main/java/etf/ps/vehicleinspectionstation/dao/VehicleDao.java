package etf.ps.vehicleinspectionstation.dao;

import etf.ps.vehicleinspectionstation.model.Vehicle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VehicleDao extends JpaRepository<Vehicle,Long> {
}
