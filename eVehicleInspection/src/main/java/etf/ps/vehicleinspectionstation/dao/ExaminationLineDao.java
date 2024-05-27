package etf.ps.vehicleinspectionstation.dao;

import etf.ps.vehicleinspectionstation.model.ExaminationLine;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ExaminationLineDao extends JpaRepository<ExaminationLine,Long> {
}
