package etf.ps.vehicleinspectionstation.services;

import etf.ps.vehicleinspectionstation.dto.*;
import etf.ps.vehicleinspectionstation.model.Vehicle;

import java.util.List;

public interface VehicleService {
    List<String> types();
    List<Integer> classes();
    Cost calculateCarCost(CalculatorCarRequest request);
    Cost calculateCargoCost(CalculatorCargoRequest request);
    Cost calculateBikeCost(CalculatorBikeRequest request);
    Cost calculateCost(CalculatorRequest request);
    VehicleDTO createVehicle(VehicleDTO vehicle);
    boolean delete(long id);
    boolean changeMalus(long id, double malus);
}
