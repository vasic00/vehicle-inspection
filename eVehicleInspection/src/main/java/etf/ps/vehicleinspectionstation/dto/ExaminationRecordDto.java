package etf.ps.vehicleinspectionstation.dto;

import lombok.Data;

import java.util.List;

@Data
public class ExaminationRecordDto {
    private long id;
    private boolean passed;
    private String description;
    private List<CriteriaDto> criteria;
}
