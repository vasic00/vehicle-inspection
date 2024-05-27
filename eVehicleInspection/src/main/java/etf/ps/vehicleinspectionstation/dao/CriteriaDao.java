package etf.ps.vehicleinspectionstation.dao;

import etf.ps.vehicleinspectionstation.model.Criteria;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CriteriaDao extends JpaRepository<Criteria,Long> {
}
