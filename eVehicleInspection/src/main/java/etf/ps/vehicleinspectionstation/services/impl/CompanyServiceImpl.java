package etf.ps.vehicleinspectionstation.services.impl;

import etf.ps.vehicleinspectionstation.dao.*;
import etf.ps.vehicleinspectionstation.dto.*;
import etf.ps.vehicleinspectionstation.enums.Role;
import etf.ps.vehicleinspectionstation.model.*;
import etf.ps.vehicleinspectionstation.services.CompanyService;
import etf.ps.vehicleinspectionstation.services.MapService;
import etf.ps.vehicleinspectionstation.util.CustomLogger;
import io.minio.GetObjectArgs;
import io.minio.MinioClient;
import kotlin.OptIn;
import org.checkerframework.checker.nullness.Opt;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.swing.text.html.Option;
import java.io.InputStream;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class CompanyServiceImpl implements CompanyService {
    private final CompanyDao companyDao;
    private final GradeDao gradeDao;
    private final InspectionStationDao inspectionStationDao;
    private final ExaminationLineDao examinationLineDao;
    private final HolidayDao holidayDao;
    private final WorkerDao workerDao;
    private final MapService mapService;
    private final ModelMapper modelMapper;
    private final MinioClient minioClient;
    private final CustomLogger logger;
    private final PasswordEncoder encoder;

    @Value("${minio.bucket}")
    private String minio_bucket;

    public CompanyServiceImpl(CompanyDao companyDao, GradeDao gradeDao, InspectionStationDao inspectionStationDao, ExaminationLineDao examinationLineDao, HolidayDao holidayDao, WorkerDao workerDao, MapService mapService, ModelMapper modelMapper, MinioClient minioClient, CustomLogger logger, PasswordEncoder encoder) {
        this.companyDao = companyDao;
        this.gradeDao = gradeDao;
        this.inspectionStationDao = inspectionStationDao;
        this.examinationLineDao = examinationLineDao;
        this.holidayDao = holidayDao;
        this.workerDao = workerDao;
        this.mapService = mapService;
        this.modelMapper = modelMapper;
        this.minioClient = minioClient;
        this.logger = logger;
        this.encoder = encoder;
    }

    @Override
    public List<CompanyDto> getAll() {
        return companyDao.findAllByActive(true).stream().map(mapService::map).toList();
    }

    @Override
    public boolean addGrade(long id, int value) {
        Optional<Company> company = companyDao.findById(id);
        if (company.isPresent() && value < 6 && value > 0) {
            Grade grade = new Grade();
            grade.setCompany(company.get());
            grade.setGrade(value);
            gradeDao.saveAndFlush(grade);
            return true;
        } else {
            logger.log("Invalid company id/grade value!", false);
            return false;
        }

    }

    @Override
    public byte[] getImageByName(String name) {
        try (InputStream stream = minioClient.getObject(
                GetObjectArgs.builder()
                        .bucket(minio_bucket)
                        .object(name)
                        .build())) {
            return stream.readAllBytes();
        } catch (Exception e) {
            e.printStackTrace();
            logger.logException(e, true);
            logger.log("Can't fetch company logo (" + name + ")!", true);
            return null;
        }
    }


    @Override
    public boolean updateStation(long id, InspectionStationDto dto) {
        Optional<InspectionStation> inspectionStation = inspectionStationDao.findById(id);
        if (inspectionStation.isPresent()) {
            inspectionStation.get().setName(dto.getName());
            inspectionStation.get().setAddress(dto.getAddress());
            inspectionStation.get().setEmail(dto.getEmail());
            inspectionStation.get().setPhone(dto.getPhone());
            inspectionStation.get().setStartsAt(dto.getStartsAt());
            inspectionStation.get().setEndsAt(dto.getEndsAt());

            inspectionStationDao.saveAndFlush(inspectionStation.get());
            return true;
        }
        return false;
    }

    @Override
    public List<ExaminationLineDto> getStationLines(long id) {
        Optional<InspectionStation> station = inspectionStationDao.findById(id);
        if (station.isPresent())
            return station.get().getLines().stream().filter(l -> !l.isDeleted()).map(l -> modelMapper.map(l, ExaminationLineDto.class)).toList();
        return new ArrayList<ExaminationLineDto>();

    }

    @Override
    public List<WorkerDto> getStationWorkers(long id) {

        Optional<InspectionStation> station = inspectionStationDao.findById(id);
        if (station.isPresent())
            return station.get().getWorkers().stream().filter(w -> !w.isDeleted()).map(w -> mapService.map(w, false)).toList();
        return new ArrayList<WorkerDto>();
    }

    @Override
    public InspectionStationDto createStation(long id, InspectionStationDto stationDto) {
        Optional<Company> company = companyDao.findById(id);
        if (company.isPresent()) {
            InspectionStation temp = modelMapper.map(stationDto, InspectionStation.class);
            temp.setDeleted(false);
            temp.setCompany(company.get());
            InspectionStation inspectionStation = inspectionStationDao.saveAndFlush(temp);
            stationDto.setId(inspectionStation.getId());
            stationDto.setLinesNum(0);
            stationDto.setDeleted(false);
            stationDto.setEmployeesNum(0);
            return stationDto;
        }
        return null;
    }

    @Override
    public boolean addLine(long id, ExaminationLineDto line) {
        Optional<InspectionStation> inspectionStation=inspectionStationDao.findById(id);
        if(inspectionStation.isPresent()){
            ExaminationLine examinationLine=new ExaminationLine();
            examinationLine.setName(line.getName());
            examinationLine.setDeleted(false);
            examinationLine.setInspectionStation(inspectionStation.get());
            examinationLineDao.saveAndFlush(examinationLine);
            return true;
        }
        return false;
    }

    @Override
    public boolean addWorker(long id, WorkerDto workerDto) {
        Optional<InspectionStation> station=inspectionStationDao.findById(id);
        if(station.isPresent()){
            Worker worker=new Worker();
            worker.setFirstname(workerDto.getFirstname());
            worker.setLastname(workerDto.getLastname());
            worker.setPassword(encoder.encode(workerDto.getPassword()));
            worker.setUsername(workerDto.getUsername());
            worker.setBlocked(false);
            worker.setVacationLimit(workerDto.getVacationLimit());
            worker.setRole(Role.WORKER);
            worker.setStation(station.get());
            worker.setDeleted(false);

            workerDao.saveAndFlush(worker);
            return  true;
        }
        return false;
    }

    @Override
    public HolidayDto addHoliday(long id, HolidayDto holidayDto) {
        Optional<Company> company=companyDao.findById(id);
        if(company.isPresent() && holidayDto.getHolidayDate().isAfter(LocalDate.now()) && !company.get().getHolidays().stream().anyMatch(h -> h.getHolidayDate().equals(holidayDto.getHolidayDate()))){
            Holiday holiday=new Holiday();
            holiday.setHolidayDate(holidayDto.getHolidayDate());
            holiday.setCompany(company.get());
            Holiday result=holidayDao.saveAndFlush(holiday);
            holidayDto.setId(result.getId());
            return  holidayDto;
        }
        else return null;
    }

    @Override
    public List<HolidayDto> getHolidays(long id) {
        return holidayDao.getHolidaysByCompanyId(id).stream().map(h -> modelMapper.map(h, HolidayDto.class)).toList();
    }

    @Override
    public boolean removeHoliday(long id) {
        Optional<Holiday> holiday=holidayDao.findById(id);
        if(holiday.isPresent() && holiday.get().getHolidayDate().isAfter(LocalDate.now())){
            holidayDao.deleteById(id);
            return true;
        }
        else return false;
    }

    @Override
    public boolean deleteLine(long id) {
        Optional<ExaminationLine> line=examinationLineDao.findById(id);
        if(line.isPresent()){
            line.get().setDeleted(true);
            examinationLineDao.saveAndFlush(line.get());
            return true;
        }
        return false;
    }

    @Override
    public List<InspectionStationDto> getStations(long id) {
        Optional<Company> company=companyDao.findById(id);
        if(company.isPresent()){
            return mapService.map(company.get()).getStations();
        }
        else return  new ArrayList<InspectionStationDto>();
    }
}
