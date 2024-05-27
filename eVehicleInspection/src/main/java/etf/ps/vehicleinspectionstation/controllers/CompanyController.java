package etf.ps.vehicleinspectionstation.controllers;

import etf.ps.vehicleinspectionstation.dto.*;
import etf.ps.vehicleinspectionstation.model.InspectionStation;
import etf.ps.vehicleinspectionstation.services.CompanyService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Base64;
import java.util.List;

@RestController
@RequestMapping("/companies")
public class CompanyController {
    private final CompanyService companyService;
    private final Base64.Decoder decoder = Base64.getDecoder();

    public CompanyController(CompanyService companyService) {
        this.companyService = companyService;
    }

    @GetMapping
    public ResponseEntity<List<CompanyDto>> getAll() {
        return new ResponseEntity<>(companyService.getAll(), HttpStatus.OK);
    }

    @PutMapping("/grade/{id}")
    public ResponseEntity<?> addGrade(@PathVariable long id, @RequestBody ValueDto grade) {
        boolean flag = companyService.addGrade(id, grade.getValue());
        return new ResponseEntity(flag ? HttpStatus.OK : HttpStatus.NOT_FOUND);
    }

    @GetMapping(path = "/logo/{img}", produces = MediaType.IMAGE_PNG_VALUE)
    public ResponseEntity<?> getReportImageById(@PathVariable String img) {
        byte[] result = companyService.getImageByName(new String(decoder.decode(img.getBytes())));
        if (result != null)
            return new ResponseEntity<>(result, HttpStatus.OK);
        else
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PutMapping("/stations/{id}")
    public ResponseEntity<?> updateStation(@PathVariable long id, @RequestBody InspectionStationDto dto) {
        return new ResponseEntity<>(companyService.updateStation(id, dto) ? HttpStatus.OK : HttpStatus.NOT_FOUND);
    }

    @GetMapping("/stations/lines/{id}")
    public ResponseEntity<List<ExaminationLineDto>> getLines(@PathVariable long id) {
        return new ResponseEntity<>(companyService.getStationLines(id), HttpStatus.OK);
    }

    @GetMapping("/stations/workers/{id}")
    public ResponseEntity<List<WorkerDto>> getWorkers(@PathVariable long id) {
        return new ResponseEntity<>(companyService.getStationWorkers(id), HttpStatus.OK);
    }

    @PostMapping("/{id}/stations")
    public ResponseEntity<InspectionStationDto> postStation(@PathVariable long id, @RequestBody InspectionStationDto inspectionStationDto) {
        InspectionStationDto result = companyService.createStation(id, inspectionStationDto);
        if (result != null)
            return new ResponseEntity<>(result, HttpStatus.OK);
        else return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
    @GetMapping("/{id}/stations")
    public ResponseEntity<List<InspectionStationDto>> getStations(@PathVariable long id) {
        return new ResponseEntity<>(companyService.getStations(id),HttpStatus.OK);
    }
    @PostMapping("/stations/{id}/lines")
    public ResponseEntity<?> postLine(@PathVariable long id,@RequestBody ExaminationLineDto dto){
        return new ResponseEntity<>(companyService.addLine(id,dto)?HttpStatus.OK: HttpStatus.NOT_FOUND);
    }
    @PostMapping("/stations/{id}/workers")
    public ResponseEntity<?> postWorker(@PathVariable long id,@RequestBody WorkerDto dto){
        return new ResponseEntity<>(companyService.addWorker(id,dto)?HttpStatus.OK: HttpStatus.NOT_FOUND);
    }

    @PostMapping("/{id}/holidays")
    public ResponseEntity<HolidayDto> addHoliday(@RequestBody HolidayDto holidayDto, @PathVariable long id){
        HolidayDto result=companyService.addHoliday(id,holidayDto);
        if(result!=null)
            return  new ResponseEntity<HolidayDto>(result,HttpStatus.OK);
        else
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
    @GetMapping("/{id}/holidays")
    public ResponseEntity<List<HolidayDto>> getHolidays(@PathVariable long id){
        List<HolidayDto> result=companyService.getHolidays(id);
        return  new ResponseEntity<List<HolidayDto>>(result,HttpStatus.OK);
    }
    @DeleteMapping("/holidays/{id}")
    public ResponseEntity<?> removeHoliday(@PathVariable long id){
        return  new ResponseEntity<>(companyService.removeHoliday(id)?HttpStatus.OK:HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/lines/{id}")
    public ResponseEntity<?> deleteLine(@PathVariable long id){
        return new ResponseEntity<>(companyService.deleteLine(id)?HttpStatus.OK:HttpStatus.NOT_FOUND);
    }
}
