package etf.ps.vehicleinspectionstation.dao;

import etf.ps.vehicleinspectionstation.model.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MessageDao extends JpaRepository<Message,Long> {
}
