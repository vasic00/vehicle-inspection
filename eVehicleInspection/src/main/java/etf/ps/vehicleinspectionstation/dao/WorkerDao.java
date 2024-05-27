package etf.ps.vehicleinspectionstation.dao;

import etf.ps.vehicleinspectionstation.model.Worker;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WorkerDao extends JpaRepository<Worker,Long> {
    Worker findByUsername(String username);
}
