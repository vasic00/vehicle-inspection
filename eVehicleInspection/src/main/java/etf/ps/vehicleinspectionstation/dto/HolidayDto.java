package etf.ps.vehicleinspectionstation.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class HolidayDto {
    private long id;
    private LocalDate holidayDate;
}
