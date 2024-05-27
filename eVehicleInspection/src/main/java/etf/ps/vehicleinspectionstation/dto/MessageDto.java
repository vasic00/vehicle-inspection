package etf.ps.vehicleinspectionstation.dto;

import etf.ps.vehicleinspectionstation.model.Customer;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;

import java.util.Date;

@Data
public class MessageDto {
    private long id;
    private String content;
    private String sender;
    private boolean read;
    private Date time;
    private String title;
}
