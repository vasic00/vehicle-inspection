package etf.ps.vehicleinspectionstation.dto;

import lombok.Data;

@Data
public class CriteriaDto {
    private long id;
    private String name;
    private boolean satisfied;
    private String description;
}
