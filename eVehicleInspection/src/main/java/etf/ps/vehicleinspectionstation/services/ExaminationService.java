package etf.ps.vehicleinspectionstation.services;

import com.itextpdf.text.DocumentException;
import etf.ps.vehicleinspectionstation.dto.ExaminationDto;
import etf.ps.vehicleinspectionstation.model.Examination;

import java.io.IOException;
import java.util.List;

public interface ExaminationService {
    ExaminationDto create(ExaminationDto examinationDto);
    byte[] generatePdf(long id, String filePath);
    List<String> criteria();
    List<ExaminationDto> getExaminations(long id);
}
