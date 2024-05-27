package etf.ps.vehicleinspectionstation.controllers;

import etf.ps.vehicleinspectionstation.dto.VacationDto;
import etf.ps.vehicleinspectionstation.dto.WorkerDto;
import etf.ps.vehicleinspectionstation.services.WorkerService;
import jakarta.websocket.server.PathParam;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
@RestController
@RequestMapping("/workers")
public class WorkerController {
    private final WorkerService workerService;

    public WorkerController(WorkerService workerService) {
        this.workerService = workerService;
    }

    @PostMapping("/{id}/vacation")
    public ResponseEntity<VacationDto> addVacation(@PathVariable long id, @RequestBody VacationDto dto) {
        VacationDto result=workerService.addVacation(id,dto.getDate());
        if(result!=null)
            return new ResponseEntity<>(result,HttpStatus.OK);
        else
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/vacation/{id}")
    public ResponseEntity<?> removeVacation(@PathVariable long id) {
        return new ResponseEntity<>(workerService.removeVacation(id) ? HttpStatus.OK : HttpStatus.NOT_FOUND);
    }
    @PutMapping("/{id}/block")
    public ResponseEntity<?> blockWorker(@PathVariable long id, @RequestParam("flag") boolean block){
        return new ResponseEntity<>(workerService.blockUser(id,block)?HttpStatus.OK: HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteWorker(@PathVariable long id){
        return new ResponseEntity<>(workerService.delete(id)?HttpStatus.OK:HttpStatus.NOT_FOUND);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> changeLocation(@PathVariable long id, @RequestBody WorkerDto workerDto){
        return new ResponseEntity<>(workerService.changeLocation(id,workerDto.getStation().getId())?HttpStatus.OK: HttpStatus.NOT_FOUND);
    }
}
