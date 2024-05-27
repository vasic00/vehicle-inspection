package etf.ps.vehicleinspectionstation.dto;

import lombok.Data;

import java.util.List;

@Data
public class CompanyDto {
    private long id;
    private String name;
    private String address;
    private String email;
    private String phone;
    private String description;
    private String logo;
    private boolean active;
    private float grade;
    private List<InspectionStationDto> stations;
    private List<HolidayDto> holidays;
}
