package etf.ps.vehicleinspectionstation.controllers;

import etf.ps.vehicleinspectionstation.dto.*;
import etf.ps.vehicleinspectionstation.services.VehicleService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/vehicles")
public class VehicleController {
    private final VehicleService vehicleService;

    public VehicleController(VehicleService vehicleService) {
        this.vehicleService = vehicleService;
    }

    @PostMapping("/cars")
    public ResponseEntity<VehicleDTO> addVehicle(@RequestBody CarDto vehicle){
        VehicleDTO result=vehicleService.createVehicle(vehicle);
        if(result!=null)
            return new ResponseEntity<>(result,HttpStatus.OK);
        else
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
    @PostMapping("/cargo")
    public ResponseEntity<VehicleDTO> addVehicle(@RequestBody CargoDto vehicle){
        VehicleDTO result=vehicleService.createVehicle(vehicle);
        if(result!=null)
            return new ResponseEntity<>(result,HttpStatus.OK);
        else
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
    @PostMapping("/bikes")
    public ResponseEntity<VehicleDTO> addVehicle(@RequestBody MotorBikeDto vehicle){
        VehicleDTO result=vehicleService.createVehicle(vehicle);
        if(result!=null)
            return new ResponseEntity<>(result,HttpStatus.OK);
        else
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
    @GetMapping("/engines")
    public ResponseEntity<List<String>> getEngineTypes(){
        return new ResponseEntity<>(vehicleService.types(), HttpStatus.OK);
    }
    @GetMapping("/classes")
    public ResponseEntity<List<Integer>> getEngineClasses(){
        return new ResponseEntity<>(vehicleService.classes(), HttpStatus.OK);
    }
    @PostMapping("/calculator")
    public ResponseEntity<Cost> getCost(@RequestBody CalculatorRequest request){
        Cost cost=vehicleService.calculateCost(request);
        if(cost==null)
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        else
            return new ResponseEntity<Cost>(cost,HttpStatus.OK);
    }
    @PostMapping("/calculator/cars")
    public ResponseEntity<Cost> getCostCars(@RequestBody CalculatorCarRequest request){
        Cost cost=vehicleService.calculateCarCost(request);
        if(cost==null)
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        else
            return new ResponseEntity<Cost>(cost,HttpStatus.OK);
    }
    @PostMapping("/calculator/cargo")
    public ResponseEntity<Cost> getCostCargo(@RequestBody CalculatorCargoRequest request){
        Cost cost=vehicleService.calculateCargoCost(request);
        if(cost==null)
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        else
            return new ResponseEntity<Cost>(cost,HttpStatus.OK);
    }
    @PostMapping("/calculator/bikes")
    public ResponseEntity<Cost> getCostBikes(@RequestBody CalculatorBikeRequest request){
        Cost cost=vehicleService.calculateBikeCost(request);
        if(cost==null)
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        else
            return new ResponseEntity<Cost>(cost,HttpStatus.OK);
    }
    @PutMapping("/delete/{id}")
    public ResponseEntity<?> delete(@PathVariable("id") long id){
        return new ResponseEntity<>(vehicleService.delete(id)?HttpStatus.OK:HttpStatus.NOT_FOUND);
    }
    @PutMapping("/malus/{id}")
    public ResponseEntity<?> changeMalus(@PathVariable("id") long id,@RequestParam("malus") double value){
        return new ResponseEntity<>(vehicleService.changeMalus(id,value)?HttpStatus.OK:HttpStatus.NOT_FOUND);
    }
}
