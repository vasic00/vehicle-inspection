package etf.ps.vehicleinspectionstation.dao;

import etf.ps.vehicleinspectionstation.model.Examination;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ExaminationDao extends JpaRepository<Examination,Long> {
    List<Examination> findAllByLineInspectionStationIdAndTimeAfter(long id, LocalDateTime time);
}
