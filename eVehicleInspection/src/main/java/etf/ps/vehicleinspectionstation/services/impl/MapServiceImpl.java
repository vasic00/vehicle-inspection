package etf.ps.vehicleinspectionstation.services.impl;

import etf.ps.vehicleinspectionstation.dto.*;
import etf.ps.vehicleinspectionstation.enums.Status;
import etf.ps.vehicleinspectionstation.enums.VehicleType;
import etf.ps.vehicleinspectionstation.model.*;
import etf.ps.vehicleinspectionstation.services.MapService;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class MapServiceImpl implements MapService {
    private final ModelMapper modelMapper;

    public MapServiceImpl(ModelMapper modelMapper) {
        this.modelMapper = modelMapper;
    }

    @Override
    public ExaminationDto map(Examination examination, boolean flag) {
        ExaminationDto dto = new ExaminationDto();
        dto.setEngine(examination.getEngine());
        dto.setEnginePower(examination.getEnginePower());
        dto.setEngineVolume(examination.getEngineVolume());
        dto.setEmissionClass(examination.getEmissionClass());
        dto.setMalus(examination.getMalus());
        dto.setPrice(examination.getPrice());
        dto.setProductionYear(examination.getProductionYear());
        dto.setManufacturer(examination.getManufacturer());
        dto.setColor(examination.getColor());
        dto.setModel(examination.getModel());
        dto.setType(examination.getType());
        dto.setMass(examination.getMass());
        dto.setLpg(examination.isLpg());
        dto.setLoadMax(examination.getLoadMax());
        dto.setId(examination.getId());
        dto.setPrice(examination.getPrice());
        dto.setFirst(examination.isFirst());
        dto.setTime(examination.getTime());
        dto.setGreenCard(examination.isGreenCard());
        dto.setNewPlates(examination.isNewPlates());
        dto.setRegistration(examination.isRegistration());
        dto.setOwnerCert(examination.isOwnerCert());
        dto.setLicencePlates(examination.getLicencePlates());
        dto.setRegCert(examination.isRegCert());
        dto.setSupervisor(examination.getSupervisor().getFirstname() + " " + examination.getSupervisor().getLastname());
        dto.setLineId(-1);
        dto.setSupervisorId(-1);

        ExaminationRecordDto recordDto = modelMapper.map(examination.getRecord(), ExaminationRecordDto.class);
        recordDto.setCriteria(examination.getRecord().getCriteria().stream().map(c -> modelMapper.map(c, CriteriaDto.class)).toList());
        recordDto.setPassed(examination.getRecord().getCriteria().stream().allMatch(Criteria::isSatisfied));
        dto.setRecord(recordDto);
        dto.setLine(examination.getLine().getName());
        dto.setStation(examination.getLine().getInspectionStation().getName());
        dto.setCompany(examination.getLine().getInspectionStation().getCompany().getName());
        dto.setSupervisor(examination.getSupervisor().getFirstname() + " " + examination.getSupervisor().getLastname());
        dto.setPeriod(examination.getPeriod());
        if (flag)
            dto.setVehicle(modelMapper.map(this.map(examination.getVehicle(), false), VehicleInfo.class));
        return dto;
    }

    @Override
    public VehicleDTO map(Vehicle vehicle, boolean flag) {
        VehicleDTO dto = null;
        if (vehicle instanceof Car) {
            CarDto carDto = new CarDto();
            carDto.setEngineVolume(((Car) vehicle).getEngineVolume());
            carDto.setEnginePower(((Car) vehicle).getEnginePower());
            carDto.setLpg(((Car) vehicle).isLpg());
            carDto.setType(VehicleType.CAR);
            dto = carDto;
        } else if (vehicle instanceof Cargo) {
            CargoDto cargoDto = new CargoDto();
            cargoDto.setLoadMax((((Cargo) vehicle).getLoadMax()));
            cargoDto.setMass((((Cargo) vehicle).getMass()));
            cargoDto.setType(VehicleType.CARGO);
            dto = cargoDto;
        } else if (vehicle instanceof MotorBike) {
            MotorBikeDto motorBikeDto = new MotorBikeDto();
            motorBikeDto.setEngineVolume(((MotorBike) vehicle).getEngineVolume());
            motorBikeDto.setType(VehicleType.MOTORBIKE);
            dto = motorBikeDto;
        }
        dto.setId(vehicle.getId());
        dto.setEngine(vehicle.getEngine());
        dto.setColor(vehicle.getColor());
        dto.setMalus(vehicle.getMalus());
        dto.setEmissionClass(vehicle.getEmissionClass());
        dto.setManufacturer(vehicle.getManufacturer());
        dto.setModel(vehicle.getModel());
        dto.setOwner(vehicle.getOwner().getId());
        dto.setProductionYear(vehicle.getProductionYear());
        dto.setDeleted(vehicle.isDeleted());
        if (flag)
            dto.setExaminations(vehicle.getExaminations().stream().map(e -> this.map(e,false)).sorted((e1,e2)-> e1.getTime().isAfter(e2.getTime())?-1:1).toList());
        dto.setOwnerName(vehicle.getOwner().getFirstname() + " " + vehicle.getOwner().getLastname());
        return dto;
    }

    public AppointmentDto map(Appointment a) {
        AppointmentDto dto = new AppointmentDto();
        if (a.getStatus() != null) {
            dto.setDone(a.getStatus().equals(Status.DONE));
            dto.setCanceled(a.getStatus().equals(Status.CANCELED));
            dto.setStatus(a.getStatus().name());
        } else {
            dto.setStatus("UNKNOWN");
            dto.setCanceled(false);
            dto.setDone(false);
        }
        dto.setCreated(a.getCreated());
        dto.setId(a.getId());
        dto.setPrice(a.getPrice());
        dto.setStartsAt(a.getStartsAt());
        dto.setEndsAt(a.getEndsAt());
        dto.setStation(a.getLine().getInspectionStation().getCompany().getName()+" - "+a.getLine().getInspectionStation().getName());
        dto.setVehicle(map(a.getVehicle(), false));
        dto.setLine(a.getLine().getName());
        dto.setRegistration(a.isRegistration());
        dto.setFirst(a.isFirst());
        dto.setGreenCard(a.isGreenCard());
        dto.setNewPlates(a.isNewPlates());
        dto.setOwnerCert(a.isOwnerCert());
        dto.setRegCert(a.isRegCert());
        dto.setLineId(a.getLine().getId());
        return dto;
    }

    @Override
    public WorkerDto map(Worker worker, boolean flag) {
        WorkerDto dto = new WorkerDto();
        dto.setVacationDates(worker.getVacation().stream().map(v -> {
            VacationDto vDto = new VacationDto();
            vDto.setDate(v.getDate());
            vDto.setId(v.getId());
            return vDto;
        }).toList());
        dto.setVacationLimit(worker.getVacationLimit());
        dto.setId(worker.getId());
        dto.setBlocked(worker.isBlocked());
        dto.setFirstname(worker.getFirstname());
        dto.setLastname(worker.getLastname());
        dto.setPassword("****");
        dto.setUsername(worker.getUsername());
        dto.setDeleted(worker.isDeleted());
        dto.setCompany(map(worker.getStation().getCompany()));
        if (flag){
            dto.setStation(modelMapper.map(worker.getStation(), InspectionStationDto.class));
            dto.getStation().setLinesNum(worker.getStation().getLines().stream().filter(l -> !l.isDeleted()).toList().size());
        }
        else
            dto.setStation(null);

        dto.setPassword("****");
        dto.setCount(worker.getSupervised().size());
        return dto;
    }

    @Override
    public CompanyDto map(Company company) {
        CompanyDto dto = modelMapper.map(company, CompanyDto.class);
        dto.setStations(company.getStations().stream().map(s -> {
            InspectionStationDto result = modelMapper.map(s, InspectionStationDto.class);
            result.setLinesNum(s.getLines().stream().filter(l -> !l.isDeleted()).toList().size());
            result.setEmployeesNum(s.getWorkers().stream().filter(w -> !w.isDeleted()).toList().size());
            return result;
        }).toList());
        dto.setHolidays(company.getHolidays().stream().map(h -> modelMapper.map(h, HolidayDto.class)).toList());
        Optional<Integer> grade = company.getGrades().stream().map(g -> g.getGrade()).reduce((g1, g2) -> g1 + g2);
        if (grade.isPresent() && company.getGrades().size() > 0)
            dto.setGrade(((float) grade.get()) / company.getGrades().size());
        else
            dto.setGrade(0);
        return dto;
    }
}
