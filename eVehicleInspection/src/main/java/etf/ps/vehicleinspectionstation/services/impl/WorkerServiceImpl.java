package etf.ps.vehicleinspectionstation.services.impl;

import etf.ps.vehicleinspectionstation.dao.AdminDao;
import etf.ps.vehicleinspectionstation.dao.InspectionStationDao;
import etf.ps.vehicleinspectionstation.dao.VacationDao;
import etf.ps.vehicleinspectionstation.dao.WorkerDao;
import etf.ps.vehicleinspectionstation.dto.*;
import etf.ps.vehicleinspectionstation.enums.Role;
import etf.ps.vehicleinspectionstation.model.*;
import etf.ps.vehicleinspectionstation.services.CompanyService;
import etf.ps.vehicleinspectionstation.services.MapService;
import etf.ps.vehicleinspectionstation.services.WorkerService;
import etf.ps.vehicleinspectionstation.util.CustomLogger;
import org.checkerframework.checker.nullness.Opt;
import org.modelmapper.ModelMapper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Optional;

@Service
public class WorkerServiceImpl implements WorkerService {
    private final WorkerDao workerDao;
    private final InspectionStationDao inspectionStationDao;
    private final ModelMapper modelMapper;

    private final MapService mapService;
    private final CustomLogger logger;
    private final VacationDao vacationDao;
    private final AdminDao adminDao;


    public WorkerServiceImpl(WorkerDao workerDao, InspectionStationDao inspectionStationDao, ModelMapper modelMapper, MapService mapService, CustomLogger logger, VacationDao vacationDao, AdminDao adminDao) {
        this.workerDao = workerDao;
        this.inspectionStationDao = inspectionStationDao;
        this.modelMapper = modelMapper;
        this.mapService = mapService;
        this.logger = logger;
        this.vacationDao = vacationDao;
        this.adminDao = adminDao;
    }

    @Override
    public WorkerDto findByUsername(String username) {
        Worker worker = workerDao.findByUsername(username);
        if (worker != null)
            return modelMapper.map(worker, WorkerDto.class);
        else return null;
    }

    @Override
    public AdminDto findAdminById(long id) {
        Optional<Admin> admin = adminDao.findById(id);
        if (admin.isPresent()) {
            AdminDto adminDto = modelMapper.map(admin.get(), AdminDto.class);
            adminDto.setRole(Role.ADMIN);
            adminDto.setCompany(mapService.map(admin.get().getCompany()));
            return adminDto;
        }
        return null;
    }

    @Override
    public VacationDto addVacation(long id, LocalDate date) {
        try {
            Worker worker = workerDao.findById(id).get();
            long count = worker.getVacation().stream().filter(v -> v.getDate().getYear() == date.getYear()).count();
            if (count < worker.getVacationLimit() && date.isAfter(LocalDate.now())) {
                Vacation vacation = new Vacation();
                vacation.setDate(date);
                vacation.setWorker(worker);
                vacationDao.saveAndFlush(vacation);
                VacationDto dto=new VacationDto();
                dto.setDate(vacation.getDate());
                dto.setId(vacation.getId());
                return dto;
            }
        } catch (Exception e) {

        }
        return null;
    }

    @Override
    public boolean removeVacation(long id) {
        Optional<Vacation> vacation=vacationDao.findById(id);
        if(vacation.isPresent() && vacation.get().getDate().isAfter(LocalDate.now())){
            vacationDao.deleteById(id);
            return  true;
        }
        else return false;
    }

    @Override
    public boolean blockUser(long id,boolean block) {
        System.out.println("Blocked= "+block);
        Optional<Worker> worker=workerDao.findById(id);
        if(worker.isPresent()){
            worker.get().setBlocked(block);
            workerDao.saveAndFlush(worker.get());
            return true;
        }
        else
            return false;
    }

    @Override
    public boolean delete(long id) {
        Optional<Worker> worker=workerDao.findById(id);
        if(worker.isPresent()){
            worker.get().setDeleted(true);
            workerDao.saveAndFlush(worker.get());
            return true;
        }
        else
            return false;
    }

    @Override
    public boolean changeLocation(long id, long stationId) {
        Optional<Worker> worker=workerDao.findById(id);
        if(worker.isPresent()){
            Optional<InspectionStation> station=inspectionStationDao.findById(stationId);
            if(station.isPresent()){
                worker.get().setStation(station.get());
                workerDao.saveAndFlush(worker.get());
                return true;
            }
        }
        return false;
    }


    @Override
    public WorkerDto findById(long id) {
        try {
            Worker worker = workerDao.findById(id).get();
            return mapService.map(worker,true);
        } catch (Exception e) {
            return null;
        }
    }
}
