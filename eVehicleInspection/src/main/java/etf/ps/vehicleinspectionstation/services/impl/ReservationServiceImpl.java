package etf.ps.vehicleinspectionstation.services.impl;

import com.fasterxml.jackson.databind.annotation.JsonAppend;
import etf.ps.vehicleinspectionstation.dao.AppointmentDao;
import etf.ps.vehicleinspectionstation.dao.ExaminationLineDao;
import etf.ps.vehicleinspectionstation.dao.StationDao;
import etf.ps.vehicleinspectionstation.dao.VehicleDao;
import etf.ps.vehicleinspectionstation.dto.*;
import etf.ps.vehicleinspectionstation.enums.VehicleType;
import etf.ps.vehicleinspectionstation.enums.Status;
import etf.ps.vehicleinspectionstation.exceptions.BlockedAccException;
import etf.ps.vehicleinspectionstation.exceptions.ForbiddenException;
import etf.ps.vehicleinspectionstation.model.*;
import etf.ps.vehicleinspectionstation.model.pricelist.PriceList;
import etf.ps.vehicleinspectionstation.services.CustomerService;
import etf.ps.vehicleinspectionstation.services.MapService;
import etf.ps.vehicleinspectionstation.services.ReservationService;
import etf.ps.vehicleinspectionstation.services.VehicleService;
import etf.ps.vehicleinspectionstation.util.CustomLogger;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class ReservationServiceImpl
        implements ReservationService {
    private final StationDao stationDao;
    private final AppointmentDao appointmentDao;
    private final PriceList priceList;
    private final DateTimeFormatter formatter;
    private final ModelMapper mapper;
    private final VehicleService vehicleService;
    private final CustomerService customerService;
    private final MapService mapService;
    private final VehicleDao vehicleDao;
    private final ExaminationLineDao examinationLineDao;
    private final CustomLogger logger;

    public ReservationServiceImpl(StationDao stationDao, AppointmentDao appointmentDao, PriceList priceList, ModelMapper mapper, VehicleService vehicleService, CustomerService customerService, MapService mapService, VehicleDao vehicleDao, ExaminationLineDao examinationLineDao, CustomLogger logger) {
        this.stationDao = stationDao;
        this.appointmentDao = appointmentDao;
        this.priceList = priceList;
        this.mapper = mapper;
        this.vehicleService = vehicleService;
        this.customerService = customerService;
        this.mapService = mapService;
        this.vehicleDao = vehicleDao;
        this.examinationLineDao = examinationLineDao;
        this.logger = logger;
        formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
    }

    @Override
    public List<ProposalEntry> getProposals(VehicleType type, String dateString) {
        HashMap<ReservationProposal, List<InspectionStationDto>> result = new HashMap<>();
        List<InspectionStation> stations = stationDao.findAll();
        for (InspectionStation station : stations) {
            try {
                InspectionStation inspectionStation = stationDao.findById(station.getId()).get();
                LocalDateTime date = LocalDate.parse(dateString, formatter).atStartOfDay();
                LocalDateTime now = LocalDateTime.now();

                List<Appointment> reservations = appointmentDao.findAppointmentsByLineInspectionStationAndStartsAtAfterAndStartsAtBeforeAndCanceled(inspectionStation, date, date.plusDays(1), false);

                LocalDateTime start = date;
                LocalDateTime end = date.plusHours(inspectionStation.getEndsAt());

                if (now.isAfter(start))
                    start = date.plusHours(now.getHour() + 1);
                else
                    start = date.plusHours(inspectionStation.getStartsAt());

                long duration = getDuration(type);

                int step = priceList.getTimeStep();
                System.out.println("Duration=" + duration);
                System.out.println("Max=" + Math.max(priceList.getTimeStep(), duration));
                while (start.isBefore(end)) {
                    long index = findEmptyLine(inspectionStation, start, start.plusMinutes(Math.max(priceList.getTimeStep(), duration)), date.plusHours(inspectionStation.getStartsAt()), end, reservations);
                    if (index >= 0) {
                        ReservationProposal proposal = new ReservationProposal();
                        proposal.setStartsAt(start);
                        proposal.setEndsAt(start.plusMinutes(duration));
                        proposal.setDay(start.getDayOfWeek().name());
                        ProposalEntry entry = new ProposalEntry();
                        entry.setProposal(proposal);
                        if (result.containsKey(proposal)) {
                            if (!result.get(proposal).contains(station.getId())) {
                                InspectionStationDto dto = mapper.map(station, InspectionStationDto.class);
                                dto.setLinesNum(station.getLines().size());
                                dto.setName(station.getCompany().getName() + " - " + station.getName());
                                result.get(proposal).add(dto);
                            }
                        } else {
                            ArrayList<InspectionStationDto> l = new ArrayList<>();
                            InspectionStationDto dto = mapper.map(station, InspectionStationDto.class);
                            dto.setName(station.getCompany().getName() + " - " + station.getName());
                            dto.setLinesNum(station.getLines().size());
                            l.add(dto);
                            result.put(proposal, l);
                        }
                    }
                    start = start.plusMinutes(step);
                }
            } catch (
                    Exception e) {
                e.printStackTrace();
                logger.logException(e, false);
            }
        }
        List<ProposalEntry> list = new ArrayList<>();
        for (Map.Entry<ReservationProposal, List<InspectionStationDto>> e : result.entrySet()) {
            ProposalEntry proposalEntry = new ProposalEntry();
            proposalEntry.setProposal(e.getKey());
            proposalEntry.setStations(e.getValue());
            list.add(proposalEntry);
        }
        return list.stream().sorted((e1, e2) -> {
            return e1.getProposal().getStartsAt().isBefore(e2.getProposal().getStartsAt()) ? -1 : 1;
        }).toList();
    }

    @Override
    public List<ReservationProposal> getPoposals(long station, VehicleType type, String dateString) {
        ArrayList<ReservationProposal> result = new ArrayList<>();

        try {
            InspectionStation inspectionStation = stationDao.findById(station).get();
            LocalDateTime date = LocalDate.parse(dateString, formatter).atStartOfDay();
            LocalDateTime now = LocalDateTime.now();

            List<Appointment> reservations = appointmentDao.findAppointmentsByLineInspectionStationAndStartsAtAfterAndStartsAtBeforeAndCanceled(inspectionStation, date, date.plusDays(1), false);

            LocalDateTime start = date;
            LocalDateTime end = date.plusHours(inspectionStation.getEndsAt());

            if (now.isAfter(start))
                start = date.plusHours(now.getHour() + 1);
            else
                start = date.plusHours(inspectionStation.getStartsAt());

            long duration = getDuration(type);

            int step = priceList.getTimeStep();
            System.out.println("Duration=" + duration);
            System.out.println("Max=" + Math.max(priceList.getTimeStep(), duration));
            while (start.isBefore(end)) {
                long index = findEmptyLine(inspectionStation, start, start.plusMinutes(Math.max(priceList.getTimeStep(), duration)), date.plusHours(inspectionStation.getStartsAt()), end, reservations);
                if (index >= 0) {
                    ReservationProposal proposal = new ReservationProposal();
                    proposal.setStartsAt(start);
                    proposal.setEndsAt(start.plusMinutes(duration));
                    proposal.setDay(start.getDayOfWeek().name());
                    result.add(proposal);
                }
                start = start.plusMinutes(step);
            }
        } catch (
                Exception e) {
            e.printStackTrace();
            logger.logException(e, false);
        }
        return result;
    }

    private long findEmptyLine(InspectionStation station, LocalDateTime start, LocalDateTime end, LocalDateTime startWork, LocalDateTime endWork, List<Appointment> data) {
        if (station.getCompany().getHolidays().stream().noneMatch(h -> h.getHolidayDate().getYear() == start.getYear() && h.getHolidayDate().getMonthValue() == start.getMonthValue() && h.getHolidayDate().getDayOfMonth() == start.getDayOfMonth())) {
            if (start.isAfter(LocalDateTime.now()) && start.isBefore(LocalDateTime.now().plusMonths(12))) {
                if (start.getYear() == end.getYear() && start.getMonthValue() == end.getMonthValue() && start.getDayOfMonth() == end.getDayOfMonth()) {
                    if (!start.getDayOfWeek().equals(DayOfWeek.SATURDAY) && !start.getDayOfWeek().equals(DayOfWeek.SUNDAY)) {
                        if (start.isAfter(startWork) || start.isEqual(startWork)) {
                            if (end.isBefore(endWork) || end.isEqual(endWork)) {
                                List<Appointment> exact = data.stream().filter(r -> r.getStartsAt().isEqual(start)).toList();
                                List<Appointment> before = data.stream().filter(r -> r.getStartsAt().isBefore(start) && r.getEndsAt().isAfter(start)).toList();
                                List<Appointment> during = data.stream().filter(r -> r.getStartsAt().isAfter(start) && r.getStartsAt().isBefore(end)).toList();
                                if (exact.size() + before.size() + during.size() < station.getLines().stream().filter(l -> !l.isDeleted()).toList().size() && station.getWorkers().stream().filter(w -> !w.isDeleted() && w.getVacation().stream().noneMatch(h->h.getDate().getYear() == start.getYear() && h.getDate().getMonthValue() == start.getMonthValue() && h.getDate().getDayOfMonth() == start.getDayOfMonth())).toList().size()>exact.size() + before.size() + during.size()) {
                                    List<ExaminationLine> reserved = new ArrayList<>(exact).stream().map(a -> a.getLine()).toList();
                                    for (ExaminationLine el : station.getLines().stream().filter(l -> !l.isDeleted()).toList()) {
                                        if (!exact.stream().map(a -> a.getLine()).toList().contains(el) && !before.stream().map(a -> a.getLine()).toList().contains(el) && !during.stream().map(a -> a.getLine()).toList().contains(el))
                                            return el.getId();
                                    }
                                }
//
                            }
                        }
                    }
                }
            }
        }
        return -1;
    }

    private long getDuration(VehicleType type) {
        switch (type) {
            case CAR:
                return priceList.getCars().getDuration();
            case MOTORBIKE:
                return priceList.getBikes().getDuration();
            default:
                return priceList.getCargo().getDuration();

        }
    }

    @Override
    public AppointmentDto book(CustomerDTO customer, ReservationRequest request) throws ForbiddenException, BlockedAccException {
        if (customerService.blocked(customer.getId()))
            throw new BlockedAccException();
        try {
            InspectionStation station = stationDao.findById(request.getStation()).get();
            Vehicle vehicle = vehicleDao.findById(request.getVehicle()).get();
            if (vehicle.getOwner().getId() != customer.getId()) {
                logger.log("Not owner! id=" + customer.getId(), true);
                return null;
            }
            Optional<Examination> latest = vehicle.getExaminations().stream().filter(e -> e.isRegistration()).min((e1, e2) -> e1.getTime().isBefore(e2.getTime()) ? 1 : -1);
            List<Appointment> appointments = vehicle.getAppointments().stream().filter(a -> a.getStatus().equals(Status.BOOKED) && a.getStartsAt().isAfter(LocalDateTime.now())).toList();
//            List<Appointment> appointments = vehicle.getAppointments().stream().filter(a -> a.isRegistration() && a.getStatus().equals(Status.BOOKED) && a.getStartsAt().isAfter(LocalDateTime.now())).toList();
//            if (latest.isPresent() && request.isRegistration() && latest.get().getRecord().getCriteria().stream().map(Criteria::isSatisfied).reduce(true, (s1, s2) -> s1 && s2) && latest.get().getTime().isAfter(request.getStartsAt().plusDays(-345))) {
//                logger.log("Already registered this vehicle!", false);
//                throw new ForbiddenException();
//            }
            if (!appointments.isEmpty()) {
                logger.log("Already appointed!", false);
                throw new ForbiddenException();
            }
            List<Appointment> reservations = appointmentDao.findAppointmentsByLineInspectionStationAndStartsAtAfterAndStartsAtBeforeAndCanceled(station, LocalDateTime.of(request.getStartsAt().getYear(), request.getStartsAt().getMonthValue(), request.getStartsAt().getDayOfMonth(), 0, 0), LocalDateTime.of(request.getStartsAt().getYear(), request.getStartsAt().getMonthValue(), request.getStartsAt().getDayOfMonth(), 0, 0).plusDays(1), false);
            long duration = getDuration(vehicle.getType());
            long line = findEmptyLine(station, request.getStartsAt(), request.getStartsAt().plusMinutes(duration), LocalDateTime.of(request.getStartsAt().getYear(), request.getStartsAt().getMonthValue(), request.getStartsAt().getDayOfMonth(), station.getStartsAt(), 0), LocalDateTime.of(request.getStartsAt().getYear(), request.getStartsAt().getMonthValue(), request.getStartsAt().getDayOfMonth(), station.getEndsAt(), 0), reservations);
            if (line >= 0) {
                Appointment appointment = mapper.map(request, Appointment.class);
                appointment.setPrice(vehicleService.calculateCost(mapper.map(request, CalculatorRequest.class)).getValue());
                appointment.setEndsAt(appointment.getStartsAt().plusMinutes(duration));
                appointment.setLine(examinationLineDao.findById(line).get());
                appointment.setVehicle(vehicle);
                appointment.setCreated(LocalDateTime.now());
                appointment.setCanceled(false);
                appointment.setStatus(Status.BOOKED);
                appointment = appointmentDao.saveAndFlush(appointment);
                AppointmentDto dto = mapService.map(appointment);
                return dto;
            }
        } catch (ForbiddenException fe) {
            throw fe;
        } catch (Exception e) {
            e.printStackTrace();
            logger.logException(e, false);
        }
        return null;
    }


    @Override
    public List<AppointmentDto> getAppointmentsByStation(long id) {
        LocalDateTime now = LocalDateTime.now();
        List<Appointment> entities = appointmentDao.findAppointmentsByLineInspectionStationId(id);
        return entities.stream()
                .filter(a -> (a.getStartsAt().isAfter(now) && a.getStatus().equals(Status.BOOKED)) && !a.isCanceled())
                .sorted((a1, a2) -> {
                    return a1.getStartsAt().isBefore(a2.getStartsAt()) ? -1 : 1;
                }).map(mapService::map).toList();
    }

    @Override
    public List<AppointmentDto> getAppointmentsByCompany(long id) {
        LocalDateTime now = LocalDateTime.now();
        List<Appointment> entities = appointmentDao.findAppointmentsByLineInspectionStationCompanyId(id);
        return entities.stream()
                .filter(a -> a.getStartsAt().isAfter(now) && !a.isCanceled() && a.getStatus().equals(Status.BOOKED))
                .sorted((a1, a2) -> {
                    return a1.getStartsAt().isBefore(a2.getStartsAt()) ? -1 : 1;
                }).map(mapService::map).toList();
    }

    @Override
    public boolean cancel(CustomerDTO customer, long id) {
        Optional<Appointment> optional = appointmentDao.findById(id);
        LocalDateTime now = LocalDateTime.now();
        if (optional.isPresent() && !optional.get().isCanceled() && optional.get().getStatus().equals(Status.BOOKED) &&
                optional.get().getVehicle().getOwner().getId() == customer.getId() &&
                optional.get().getStartsAt().plusDays(-3).isAfter(now) &&
                !customerService.blocked(customer.getId())) {
            optional.get().setCanceled(true);
            optional.get().setStatus(Status.CANCELED);
            appointmentDao.saveAndFlush(optional.get());
            customerService.addPenalty(customer.getId());
            return true;

        } else {
            logger.log("Cancel not allowed!", false);
        }
        return false;
    }


    @Override
    public boolean cancelByCompany(WorkerDto worker, long id) {
        Optional<Appointment> optional = appointmentDao.findById(id);
        LocalDateTime now = LocalDateTime.now();
        if (optional.isPresent() && !optional.get().isCanceled() && optional.get().getStatus().equals(Status.BOOKED) &&
                optional.get().getLine().getInspectionStation().getId() == worker.getStation().getId()) {
            optional.get().setCanceled(true);
            optional.get().setStatus(Status.CANCELED);
            appointmentDao.saveAndFlush(optional.get());
            return true;

        } else {
            logger.log("Cancel not allowed!", false);
        }
        return false;
    }

    @Override
    public boolean cancelByAdmin(AdminDto admin, long id) {
        Optional<Appointment> optional = appointmentDao.findById(id);
        if (optional.isPresent() && !optional.get().isCanceled() && optional.get().getStatus().equals(Status.BOOKED) &&
                optional.get().getLine().getInspectionStation().getCompany().getId() == admin.getCompany().getId()) {
            optional.get().setCanceled(true);
            optional.get().setStatus(Status.CANCELED);
            appointmentDao.saveAndFlush(optional.get());
            return true;
        } else {
            logger.log("Cancel not allowed!", false);
        }
        return false;
    }

}
