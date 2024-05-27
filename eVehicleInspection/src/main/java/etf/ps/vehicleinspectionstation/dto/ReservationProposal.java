package etf.ps.vehicleinspectionstation.dto;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.Objects;

@Data
public class ReservationProposal {
    private LocalDateTime startsAt;
    private LocalDateTime endsAt;
    private String day;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ReservationProposal that = (ReservationProposal) o;
        return Objects.equals(startsAt, that.startsAt) && Objects.equals(endsAt, that.endsAt);
    }

    @Override
    public int hashCode() {
        return Objects.hash(startsAt, endsAt);
    }
}
