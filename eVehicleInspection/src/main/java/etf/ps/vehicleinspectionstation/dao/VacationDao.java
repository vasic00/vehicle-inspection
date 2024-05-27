package etf.ps.vehicleinspectionstation.dao;

import etf.ps.vehicleinspectionstation.model.Vacation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VacationDao extends JpaRepository<Vacation,Long> {
}
