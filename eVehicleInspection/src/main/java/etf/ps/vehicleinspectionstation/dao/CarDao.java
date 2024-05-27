package etf.ps.vehicleinspectionstation.dao;

import etf.ps.vehicleinspectionstation.model.Car;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CarDao extends JpaRepository<Car,Long> {
}
