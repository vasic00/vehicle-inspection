package etf.ps.vehicleinspectionstation.dto;

import lombok.Data;

@Data
public class AdminDto extends AppUserDto{
    private String token;
    private CompanyDto company;
}
