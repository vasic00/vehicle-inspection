package etf.ps.vehicleinspectionstation.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ReservationRequest {
    private long vehicle;
    private long station;
    private LocalDateTime startsAt;
    private LocalDateTime endsAt;
    private boolean registration;
    private boolean regCert;
    private boolean ownerCert;
    private boolean greenCard;
    private boolean first;
    private boolean newPlates;
}
