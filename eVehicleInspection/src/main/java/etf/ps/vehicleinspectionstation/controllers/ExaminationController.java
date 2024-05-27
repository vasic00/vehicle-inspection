package etf.ps.vehicleinspectionstation.controllers;

import etf.ps.vehicleinspectionstation.dto.ExaminationDto;
import etf.ps.vehicleinspectionstation.services.ExaminationService;
import jdk.jfr.ContentType;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/examinations")
public class ExaminationController {
    private final ExaminationService examinationService;

    public ExaminationController(ExaminationService examinationService) {
        this.examinationService = examinationService;
    }

    @GetMapping("/criteria")
    public ResponseEntity<List<String>> getCriteria(){
        return new ResponseEntity<>(examinationService.criteria(), HttpStatus.OK);
    }
    @PostMapping
    public ResponseEntity<ExaminationDto> postExamination(@RequestBody ExaminationDto examinationDto){
        ExaminationDto result=examinationService.create(examinationDto);
        if(result!=null)
            return  new ResponseEntity<>(result,HttpStatus.OK);
        else
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
    @GetMapping("/station/{id}")
    public ResponseEntity<List<ExaminationDto>> getExaminations(@PathVariable long id){
        return new ResponseEntity<>(examinationService.getExaminations(id),HttpStatus.OK);
    }
    @GetMapping(value = "/pdf/{id}",produces = MediaType.APPLICATION_PDF_VALUE)
    public ResponseEntity<byte[]> generatePdf(@PathVariable long id){
        byte[] pdf=examinationService.generatePdf(id,"./temp.pdf");
        if(pdf!=null)
            return  new ResponseEntity<>(pdf,HttpStatus.OK);
        else
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
