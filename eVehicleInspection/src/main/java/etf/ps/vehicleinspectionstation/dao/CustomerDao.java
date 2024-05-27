package etf.ps.vehicleinspectionstation.dao;

import etf.ps.vehicleinspectionstation.model.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CustomerDao extends JpaRepository<Customer,Long> {
    List<Customer> findAllByUsername(String username);
    Customer findByUsername(String username);
}
