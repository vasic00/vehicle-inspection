package etf.ps.vehicleinspectionstation.dto;

import lombok.Data;

import java.time.LocalDateTime;
@Data
public class AppointmentDto {
    private long id;
    private LocalDateTime startsAt;
    private LocalDateTime endsAt;
    private String station;
    private LocalDateTime created;
    private VehicleDTO vehicle;
    private String status;
    private String line;
    private long lineId;
    private boolean done;
    private boolean canceled;
    private double price;
    private boolean registration;
    private boolean newPlates;
    private boolean first;
    private boolean ownerCert;
    private boolean regCert;
    private boolean greenCard;
}
