package etf.ps.vehicleinspectionstation.dao;

import etf.ps.vehicleinspectionstation.model.Grade;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GradeDao extends JpaRepository<Grade,Long> {
}
