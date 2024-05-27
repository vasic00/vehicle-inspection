package etf.ps.vehicleinspectionstation.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import java.util.List;

@Data
public class WorkerDto extends AppUserDto{
    private CompanyDto company;
    private InspectionStationDto station;
    private String token;
    private long count;
    private List<VacationDto> vacationDates;
    private int vacationLimit;
}
