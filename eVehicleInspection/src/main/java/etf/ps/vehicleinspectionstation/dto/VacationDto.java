package etf.ps.vehicleinspectionstation.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class VacationDto {
    private long id;
    private LocalDate date;
}
