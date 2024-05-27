package etf.ps.vehicleinspectionstation.dao;

import etf.ps.vehicleinspectionstation.model.MotorBike;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MotorbikeDao extends JpaRepository<MotorBike,Long> {
}
