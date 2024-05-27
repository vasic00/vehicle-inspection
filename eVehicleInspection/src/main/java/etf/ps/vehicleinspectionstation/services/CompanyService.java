package etf.ps.vehicleinspectionstation.services;

import etf.ps.vehicleinspectionstation.dto.*;
import etf.ps.vehicleinspectionstation.model.Company;
import etf.ps.vehicleinspectionstation.model.ExaminationLine;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

public interface CompanyService {
    List<CompanyDto> getAll();
    boolean addGrade(long id, int grade);
    public byte[] getImageByName(String name);

    boolean updateStation(long id, InspectionStationDto dto);

    List<ExaminationLineDto> getStationLines(long id);
    List<WorkerDto> getStationWorkers(long id);

    InspectionStationDto createStation(long id,InspectionStationDto stationDto);
    boolean addLine(long id,ExaminationLineDto line);
    boolean addWorker(long id,WorkerDto workerDto);

    HolidayDto addHoliday(long id, HolidayDto holidayDto);
    List<HolidayDto> getHolidays(long id);
    boolean removeHoliday(long id);
    boolean deleteLine(long id);
    List<InspectionStationDto> getStations(long id);
}
