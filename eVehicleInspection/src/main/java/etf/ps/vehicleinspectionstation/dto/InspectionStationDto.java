package etf.ps.vehicleinspectionstation.dto;

import etf.ps.vehicleinspectionstation.model.Company;
import etf.ps.vehicleinspectionstation.model.ExaminationLine;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;
import java.util.Objects;

@Data
public class InspectionStationDto {
    private long id;
    private String name;
    private String phone;
    private String address;
    private String email;
    private int linesNum;
    private int startsAt;
    private int endsAt;
    private int employeesNum;
    private boolean deleted;
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        InspectionStationDto that = (InspectionStationDto) o;
        return id == that.id;
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
