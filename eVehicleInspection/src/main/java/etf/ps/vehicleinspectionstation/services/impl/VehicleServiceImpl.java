package etf.ps.vehicleinspectionstation.services.impl;

import etf.ps.vehicleinspectionstation.dao.*;
import etf.ps.vehicleinspectionstation.dto.*;
import etf.ps.vehicleinspectionstation.enums.EngineType;
import etf.ps.vehicleinspectionstation.enums.VehicleType;
import etf.ps.vehicleinspectionstation.model.Car;
import etf.ps.vehicleinspectionstation.model.Cargo;
import etf.ps.vehicleinspectionstation.model.MotorBike;
import etf.ps.vehicleinspectionstation.model.Vehicle;
import etf.ps.vehicleinspectionstation.model.pricelist.*;
import etf.ps.vehicleinspectionstation.services.ExaminationService;
import etf.ps.vehicleinspectionstation.services.VehicleService;
import etf.ps.vehicleinspectionstation.util.CustomLogger;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.time.Year;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Service
public class VehicleServiceImpl implements VehicleService {

    private final PriceList priceList;
    private final CarDao carDao;
    private final CargoDao cargoDao;
    private final MotorbikeDao motorbikeDao;
    private final VehicleDao vehicleDao;
    private final CustomerDao customerDao;
    private final ModelMapper modelMapper;
    private final CustomLogger logger;

    public VehicleServiceImpl(PriceList priceList, CarDao carDao, CargoDao cargoDao, MotorbikeDao motorbikeDao, VehicleDao vehicleDao, CustomerDao customerDao, ModelMapper modelMapper, CustomLogger logger) {
        this.priceList = priceList;
        this.carDao = carDao;
        this.cargoDao = cargoDao;
        this.motorbikeDao = motorbikeDao;
        this.vehicleDao = vehicleDao;
        this.customerDao = customerDao;
        this.modelMapper = modelMapper;
        this.logger = logger;
    }

    @Override
    public List<String> types() {
        return Arrays.stream(EngineType.values()).map(Enum::name).toList();
    }

    @Override
    public List<Integer> classes() {
        return List.of(1, 2, 3, 4, 5);
    }

    @Override
    public boolean changeMalus(long id, double malus) {
        Vehicle vehicle = vehicleDao.findById(id).get();
        vehicle.setMalus(malus);
        vehicleDao.saveAndFlush(vehicle);
        return true;
    }


    @Override
    public Cost calculateCargoCost(CalculatorCargoRequest request) {
        double examination = 0;
        for (PriceItem item : priceList.getCargo().getExamination()) {
            if (item.getLower_limit() <= request.getLoad() + request.getMass())
                if (item.getUpper_limit() >= request.getLoad() + request.getMass() || item.getUpper_limit() < 0)
                    examination = item.getPrice();
        }
        if (!request.isRegistration()) {
            request.setFirst(false);
            request.setNewPlates(false);
            request.setRegCert(false);
        }
        double additionalCost = calculateAdditionalCost(priceList.getCars(), request);
        if (request.isRegistration()) {
            double fixedCost = priceList.getCargo().getAms() + priceList.getCargo().getSticker() + priceList.getCargo().getSup();

            double waterTax = 0;
            for (PriceItem item : priceList.getCargo().getWaterTax()) {
                if (item.getLower_limit() <= request.getLoad() + request.getMass())
                    if (item.getUpper_limit() >= request.getLoad() + request.getMass() || item.getUpper_limit() < 0)
                        waterTax = item.getPrice();
            }

            double ecoTax = calculateEcoTax(priceList.getCargo(), priceList.getEcoTax(), request);

            double insurance = 0;
            for (PriceItem item : priceList.getCargo().getInsurance()) {
                if (item.getLower_limit() <= request.getLoad()) {
                    if (item.getUpper_limit() >= request.getLoad() || item.getUpper_limit() < 0) {
                        insurance = item.getPrice() * request.getMalus();
                        break;
                    }
                }
            }

            double roadsTax = 0;
            if (request.getLoad() + request.getMass() >= priceList.getCargo().getRoadTaxMLimit()) {
                roadsTax = priceList.getCargo().getRoadTaxLimitPrice() + (Math.ceil(((double) (request.getLoad() + request.getMass() - priceList.getCargo().getRoadTaxMLimit())) / priceList.getCargo().getRoadTaxMStep()) * priceList.getCargo().getRoadTaxStep());
            } else {
                for (PriceItem item : priceList.getCargo().getRoadsTax()) {
                    if (item.getLower_limit() <= request.getVolume() && item.getUpper_limit() >= request.getVolume()) {
                        roadsTax = item.getPrice();
                        break;
                    }
                }
            }

            if (ecoTax == 0.0 || examination == 0.0 || insurance == 0.0 || roadsTax == 0.0 || waterTax == 0.0) {
                logger.log("Calculator error!", false);
                return null;
            } else
                return new Cost(ecoTax + fixedCost + additionalCost + examination + waterTax + roadsTax + insurance, priceList.getCurrency(), request.getMalus());
        } else {
            if (examination == 0.0) {
                logger.log("Calculator error!", false);
                return null;
            } else return new Cost(examination + additionalCost, priceList.getCurrency(), 0);
        }
    }

    @Override
    public Cost calculateBikeCost(CalculatorBikeRequest request) {
        double examination = 0;
        for (PriceItem item : priceList.getBikes().getExamination()) {
            if (item.getLower_limit() <= request.getVolume())
                if (item.getUpper_limit() >= request.getVolume() || item.getUpper_limit() < 0)
                    examination = item.getPrice();
        }
        if (!request.isRegistration()) {
            request.setFirst(false);
            request.setNewPlates(false);
            request.setRegCert(false);
        }
        double additionalCost = calculateAdditionalCost(priceList.getCars(), request);
        if (request.isRegistration()) {
            double fixedCost = priceList.getBikes().getSticker() + priceList.getBikes().getSup();

            double waterTax = 0;
            for (PriceItem item : priceList.getBikes().getWaterTax()) {
                if (item.getLower_limit() <= request.getVolume())
                    if (item.getUpper_limit() >= request.getVolume() || item.getUpper_limit() < 0)
                        waterTax = item.getPrice();
            }

            double ecoTax = calculateEcoTax(priceList.getBikes(), priceList.getEcoTax(), request);

            double insurance = 0;
            for (PriceItem item : priceList.getBikes().getInsurance()) {
                if (item.getLower_limit() <= request.getVolume()) {
                    if (item.getUpper_limit() >= request.getVolume() || item.getUpper_limit() < 0) {
                        insurance = item.getPrice() * request.getMalus();
                        break;
                    }
                }
            }

            double tax = 0;
            for (PriceItem item : priceList.getBikes().getTax()) {
                if (item.getLower_limit() <= request.getVolume()) {
                    if (item.getUpper_limit() >= request.getVolume() || item.getUpper_limit() < 0) {
                        tax = item.getPrice();
                        break;
                    }
                }
            }
            int diff = Year.now().getValue() - request.getYear();
            if (diff > priceList.getBikes().getMaxAge())
                diff = priceList.getBikes().getMaxAge();
            tax *= 1 - (priceList.getBikes().getAgeTaxDecrease() * diff);

            double roadsTax = 0;
            for (PriceItem item : priceList.getBikes().getRoadsTax()) {
                if (item.getLower_limit() <= request.getVolume()) {
                    if (item.getUpper_limit() >= request.getVolume() || item.getUpper_limit() < 0) {
                        roadsTax = item.getPrice();
                        break;
                    }
                }
            }

            if (ecoTax == 0.0 || examination == 0.0 || insurance == 0.0 || tax == 0.0 || roadsTax == 0.0 || diff < 0) {
                logger.log("Calculator error!", false);
                return null;
            } else
                return new Cost(ecoTax + fixedCost + additionalCost + examination + waterTax + tax + roadsTax + insurance, priceList.getCurrency(), request.getMalus());
        } else {
            if (examination == 0.0) {
                logger.log("Calculator error!", false);
                return null;
            } else return new Cost(examination + additionalCost, priceList.getCurrency(), 0);
        }
    }

    @Override
    public Cost calculateCost(CalculatorRequest request) {
        try {
            Optional<Car> carOpt = carDao.findById(request.getVehicle());
            if (carOpt.isPresent()) {
                CalculatorCarRequest carRequest = new CalculatorCarRequest();
                carRequest.setEngineClass(carOpt.get().getEmissionClass());
                carRequest.setEngine(carOpt.get().getEngine().name());
                carRequest.setVolume(carOpt.get().getEngineVolume());
                carRequest.setMalus(carOpt.get().getMalus());
                carRequest.setType(VehicleType.CAR.name());

                carRequest.setPower(carOpt.get().getEnginePower());
                carRequest.setYear(carOpt.get().getProductionYear());

                carRequest.setFirst(request.isFirst());
                carRequest.setNewPlates(request.isNewPlates());
                carRequest.setOwnerCert(request.isOwnerCert());
                carRequest.setRegCert(request.isRegCert());
                carRequest.setGreenCard(request.isGreenCard());
                carRequest.setRegistration(request.isRegistration());
                return calculateCarCost(carRequest);

            } else {
                Optional<Cargo> cargoOpt = cargoDao.findById(request.getVehicle());
                if (cargoOpt.isPresent()) {
                    CalculatorCargoRequest cargoRequest = new CalculatorCargoRequest();
                    cargoRequest.setEngineClass(cargoOpt.get().getEmissionClass());
                    cargoRequest.setEngine(cargoOpt.get().getEngine().name());
                    cargoRequest.setMalus(cargoOpt.get().getMalus());
                    cargoRequest.setType(VehicleType.CARGO.name());

                    cargoRequest.setMass(cargoOpt.get().getMass());
                    cargoRequest.setLoad(cargoOpt.get().getLoadMax());

                    cargoRequest.setFirst(request.isFirst());
                    cargoRequest.setNewPlates(request.isNewPlates());
                    cargoRequest.setOwnerCert(request.isOwnerCert());
                    cargoRequest.setRegCert(request.isRegCert());
                    cargoRequest.setGreenCard(request.isGreenCard());
                    cargoRequest.setRegistration(request.isRegistration());
                    return calculateCargoCost(cargoRequest);
                } else {
                    Optional<MotorBike> bikeOpt = motorbikeDao.findById(request.getVehicle());
                    if (bikeOpt.isPresent()) {
                        CalculatorBikeRequest bikeRequest = new CalculatorBikeRequest();
                        bikeRequest.setEngineClass(bikeOpt.get().getEmissionClass());
                        bikeRequest.setEngine(bikeOpt.get().getEngine().name());
                        bikeRequest.setVolume(bikeOpt.get().getEngineVolume());
                        bikeRequest.setMalus(bikeOpt.get().getMalus());
                        bikeRequest.setType(VehicleType.MOTORBIKE.name());

                        bikeRequest.setYear(bikeOpt.get().getProductionYear());

                        bikeRequest.setFirst(request.isFirst());
                        bikeRequest.setNewPlates(request.isNewPlates());
                        bikeRequest.setOwnerCert(request.isOwnerCert());
                        bikeRequest.setRegCert(request.isRegCert());
                        bikeRequest.setGreenCard(request.isGreenCard());
                        bikeRequest.setRegistration(request.isRegistration());
                        return calculateBikeCost(bikeRequest);
                    } else {
                        logger.log("Invalid vehicle id("+request.getVehicle()+")!",false);
                        return null;
                    }
                }
            }
        } catch (Exception e) {
            logger.logException(e,false);
        }
        logger.log("Calculator error!", false);
        return null;
    }

    @Override
    public VehicleDTO createVehicle(VehicleDTO vehicle) {
        vehicle.setMalus(1.0);
        try {
            if (vehicle instanceof CarDto) {
                Car car = modelMapper.map((CarDto) vehicle, Car.class);
                car.setOwner(customerDao.findById(vehicle.getOwner()).get());
                car.setDeleted(false);
                car = carDao.saveAndFlush(car);
                vehicle.setId(car.getId());
                vehicle.setExaminations(new ArrayList<>());
                return vehicle;
            } else if (vehicle instanceof CargoDto) {

                Cargo cargo = modelMapper.map((CargoDto) vehicle, Cargo.class);
                cargo.setOwner(customerDao.findById(vehicle.getOwner()).get());
                cargo.setDeleted(false);
                cargo = cargoDao.saveAndFlush(cargo);
                vehicle.setId(cargo.getId());
                vehicle.setExaminations(new ArrayList<>());
                return vehicle;
            } else if (vehicle instanceof MotorBikeDto) {
                MotorBike motorBike = modelMapper.map((MotorBikeDto) vehicle, MotorBike.class);
                motorBike.setOwner(customerDao.findById(vehicle.getOwner()).get());
                motorBike.setDeleted(false);
                motorBike = motorbikeDao.saveAndFlush(motorBike);
                vehicle.setId(motorBike.getId());
                vehicle.setExaminations(new ArrayList<>());
                return vehicle;
            } else {
                logger.log("Unknown vehicle type!", false);
                return null;
            }
        } catch (Exception e) {
            logger.logException(e,false);
            return null;
        }
    }

    @Override
    public boolean delete(long id) {
        Optional<Car> carOptional = carDao.findById(id);
        if (carOptional.isPresent()) {
            carOptional.get().setDeleted(true);
            carDao.saveAndFlush(carOptional.get());
            return true;
        } else {
            Optional<Cargo> cargoOptional = cargoDao.findById(id);
            if (cargoOptional.isPresent()) {
                cargoOptional.get().setDeleted(true);
                cargoDao.saveAndFlush(cargoOptional.get());
                return true;
            } else {
                Optional<MotorBike> motorBikeOptional = motorbikeDao.findById(id);
                if (motorBikeOptional.isPresent()) {
                    motorBikeOptional.get().setDeleted(true);
                    motorbikeDao.saveAndFlush(motorBikeOptional.get());
                    return true;
                } else {
                    logger.log("Invalid vehicle id("+id+")!", false);
                    return false;
                }
            }
        }
    }

    @Override
    public Cost calculateCarCost(CalculatorCarRequest request) {
        if (!request.isRegistration()) {
            request.setFirst(false);
            request.setNewPlates(false);
            request.setRegCert(false);
        }
        double additionalCost = calculateAdditionalCost(priceList.getCars(), request);
        if (request.isRegistration()) {
            double fixedCost = priceList.getCars().getExamination() + priceList.getCars().getAms() + priceList.getCars().getCrash() + priceList.getCars().getSticker() + priceList.getCars().getSup() + priceList.getCars().getWaterTax();
            if (request.getEngineClass() < 1) {
                request.setEngineClass(1);
            } else if (request.getEngineClass() > 5) {
                request.setEngineClass(5);
            }
            double ecoTax = calculateEcoTax(priceList.getCars(), priceList.getEcoTax(), request);

            double insurance = 0;
            for (PriceItem item : priceList.getCars().getInsurance()) {
                if (item.getLower_limit() <= request.getPower()) {
                    if (item.getUpper_limit() >= request.getPower() || item.getUpper_limit() < 0) {
                        insurance = item.getPrice() * request.getMalus();
                        break;
                    }
                }
            }
            double tax = 0;
            for (PriceItem item : priceList.getCars().getTax()) {
                if (item.getLower_limit() <= request.getVolume()) {
                    if (item.getUpper_limit() >= request.getVolume() || item.getUpper_limit() < 0) {
                        tax = item.getPrice();
                        break;
                    }
                }
            }
            int diff = Year.now().getValue() - request.getYear();
            if (diff > priceList.getCars().getMaxAge())
                diff = priceList.getCars().getMaxAge();
            tax *= 1 - (priceList.getCars().getAgeTaxDecrease() * diff);

            double roadsTax = 0;
            for (PriceItem item : priceList.getCars().getRoadsTax()) {
                if (item.getLower_limit() <= request.getVolume()) {
                    if (item.getUpper_limit() >= request.getVolume() || item.getUpper_limit() < 0) {
                        roadsTax = item.getPrice();
                        break;
                    }
                }
            }

            if (ecoTax == 0.0 || insurance == 0.0 || tax == 0.0 || roadsTax == 0.0 || diff < 0){
                logger.log("Calculator error!", false);
                return null;
            }
            else
                return new Cost(ecoTax + fixedCost + additionalCost + tax + roadsTax + insurance, priceList.getCurrency(), request.getMalus());

        } else return new Cost(priceList.getCars().getExamination() + additionalCost, priceList.getCurrency(), 0);
    }

    private double calculateEcoTax(VehicleConfig config, EcoTaxConfig ecoTaxConfig, CalculatorRequest request) {
        for (PerCriteriaData<PerCriteriaData<PriceItem>> perEngineClass : ecoTaxConfig.getData()) {
            if (perEngineClass.getCriteria().equals("Euro" + request.getEngineClass())) {
                for (PerCriteriaData<PriceItem> perEngineType : perEngineClass.getData()) {
                    if (perEngineType.getCriteria().equals(request.getEngine())) {
                        for (PriceItem item : perEngineType.getData()) {
                            if (item.getLower_limit() <= request.getVolume()) {
                                if (item.getUpper_limit() >= request.getVolume() || item.getUpper_limit() < 0)
                                    return item.getPrice();
                            }
                        }
                    }
                }
            }
        }
        return 0.0;
    }

    private double calculateAdditionalCost(VehicleConfig config, CalculatorRequest request) {
        double cost = 0;
        if (request.isFirst())
            cost += config.getStateTaxFirst();
        else cost += config.getStateTax();
        if (request.isGreenCard())
            cost += config.getGreenCard();
        if (request.isNewPlates())
            cost += config.getNewPlates();
        if (request.isOwnerCert())
            cost += config.getOwnerCert();
        if (request.isRegCert())
            cost += config.getRegCert();
        return cost;
    }
}
