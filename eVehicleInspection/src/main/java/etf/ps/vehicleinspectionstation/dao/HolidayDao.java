package etf.ps.vehicleinspectionstation.dao;

import etf.ps.vehicleinspectionstation.model.Holiday;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HolidayDao extends JpaRepository<Holiday,Long> {
    List<Holiday> getHolidaysByCompanyId(long id);
}
