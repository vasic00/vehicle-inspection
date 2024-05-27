package etf.ps.vehicleinspectionstation.dto;

import lombok.Data;

import java.util.List;
import java.util.Objects;

@Data
public class ProposalEntry {
    private ReservationProposal proposal;
    private List<InspectionStationDto> stations;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ProposalEntry that = (ProposalEntry) o;
        return Objects.equals(proposal, that.proposal);
    }

    @Override
    public int hashCode() {
        return Objects.hash(proposal);
    }
}
