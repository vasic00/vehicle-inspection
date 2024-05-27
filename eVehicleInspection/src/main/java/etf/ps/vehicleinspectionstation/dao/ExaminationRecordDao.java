package etf.ps.vehicleinspectionstation.dao;

import etf.ps.vehicleinspectionstation.model.ExaminationRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ExaminationRecordDao extends JpaRepository<ExaminationRecord,Long> {

}
