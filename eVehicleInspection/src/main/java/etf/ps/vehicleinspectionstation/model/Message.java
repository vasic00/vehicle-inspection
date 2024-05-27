package etf.ps.vehicleinspectionstation.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

@Data
@Entity
public class Message {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    private String content;
    private String sender;
    @ManyToOne
    @JoinColumn(name="recipient",nullable = false,referencedColumnName = "id")
    private Customer recipient;
    private boolean is_read;
    private Date time;
    private String title;
}
