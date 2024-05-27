package etf.ps.vehicleinspectionstation.services.impl;

import com.itextpdf.text.*;
import com.itextpdf.text.pdf.BaseFont;
import com.itextpdf.text.pdf.ColumnText;
import com.itextpdf.text.pdf.PdfContentByte;
import com.itextpdf.text.pdf.PdfWriter;
import com.itextpdf.text.pdf.draw.LineSeparator;
import etf.ps.vehicleinspectionstation.dao.AppointmentDao;
import etf.ps.vehicleinspectionstation.dao.CriteriaDao;
import etf.ps.vehicleinspectionstation.dao.ExaminationDao;
import etf.ps.vehicleinspectionstation.dao.ExaminationRecordDao;
import etf.ps.vehicleinspectionstation.dto.*;
import etf.ps.vehicleinspectionstation.enums.Status;
import etf.ps.vehicleinspectionstation.enums.VehicleType;
import etf.ps.vehicleinspectionstation.model.*;
import etf.ps.vehicleinspectionstation.model.pricelist.PriceList;
import etf.ps.vehicleinspectionstation.services.*;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ExaminationServiceImpl implements ExaminationService {

    private final ModelMapper modelMapper;
    private final PriceList priceList;
    private final ExaminationDao examinationDao;
    private final ExaminationRecordDao examinationRecordDao;
    private final CriteriaDao criteriaDao;
    private final AppointmentDao appointmentDao;
    private final MapService mapService;


    public ExaminationServiceImpl(ModelMapper modelMapper, PriceList priceList, ExaminationDao examinationDao, ExaminationRecordDao examinationRecordDao, CriteriaDao criteriaDao, AppointmentDao appointmentDao, MapService mapService) {
        this.modelMapper = modelMapper;
        this.priceList = priceList;
        this.examinationDao = examinationDao;
        this.examinationRecordDao = examinationRecordDao;
        this.criteriaDao = criteriaDao;
        this.appointmentDao = appointmentDao;
        this.mapService = mapService;
    }

    @Override
    public ExaminationDto create(ExaminationDto examinationDto) {
        Optional<Appointment> optional = appointmentDao.findById(examinationDto.getReservationId());
        if (!optional.isPresent())
            return null;
        if(optional.get().getStatus().equals(Status.DONE) || optional.get().isCanceled())
            return null;
        optional.get().setStatus(Status.DONE);
        optional.get().setCanceled(false);
        appointmentDao.saveAndFlush(optional.get());
        ExaminationRecord examinationRecord = new ExaminationRecord();
        examinationRecord.setDescription(examinationDto.getRecord().getDescription());
        examinationRecord.setCriteria(new ArrayList<>());
        ExaminationRecord recordEntity = examinationRecordDao.saveAndFlush(examinationRecord);

        examinationDto.getRecord().getCriteria().stream().forEach(dto -> {
            Criteria c = modelMapper.map(dto, Criteria.class);
            if (c.isSatisfied())
                c.setDescription("");
            c.setRecord(recordEntity);
            criteriaDao.saveAndFlush(c);
        });
System.out.println(examinationDto.getPrice());
        Examination examination = modelMapper.map(examinationDto, Examination.class);
        examination.setTime(LocalDateTime.now());
        examination.setRecord(recordEntity);
        examination.setLicencePlates(examinationDto.getLicencePlates());
        Examination result = examinationDao.saveAndFlush(examination);
        examinationDto.setId(result.getId());
        examinationDto.getRecord().setPassed(examinationDto.getRecord().getCriteria().stream().allMatch(CriteriaDto::isSatisfied));

        return examinationDto;
    }

    @Override
    public List<String> criteria() {
        return priceList.getCriteria();
    }

    @Override
    public List<ExaminationDto> getExaminations(long id) {
        LocalDateTime limit=LocalDateTime.now().plusMonths(-6);
        return examinationDao.findAllByLineInspectionStationIdAndTimeAfter(id,limit).stream().map(e -> mapService.map(e,true)).sorted((e1,e2)-> e1.getTime().isAfter(e2.getTime())?-1:1).toList();
    }

    public byte[] generatePdf(long id, String filePath) {
        try {
            Optional<Examination> optional = examinationDao.findById(id);
            if (!optional.isPresent())
                return null;
            else {
                Examination examination = optional.get();
                Document document = new Document();
                ByteArrayOutputStream baos=new ByteArrayOutputStream();
                PdfWriter writer = PdfWriter.getInstance(document, baos);
                document.open();

                Font titleFont = new Font(Font.FontFamily.HELVETICA, 18, Font.BOLD, BaseColor.BLACK);
                Font subtitleFont = new Font(Font.FontFamily.HELVETICA, 14, Font.BOLD, BaseColor.BLUE);
                Font labelFont = new Font(Font.FontFamily.HELVETICA, 12, Font.NORMAL, BaseColor.BLACK);
                Font valueFont = new Font(Font.FontFamily.HELVETICA, 12, Font.ITALIC, BaseColor.BLACK);
                Font passedStatusFont = new Font(Font.FontFamily.HELVETICA, 13, Font.ITALIC, BaseColor.GREEN);
                Font failedStatusFont = new Font(Font.FontFamily.HELVETICA, 13, Font.ITALIC, BaseColor.RED);
                Font failedFont = new Font(Font.FontFamily.HELVETICA, 12, Font.ITALIC, BaseColor.RED);
                Font foterFont = new Font(Font.FontFamily.HELVETICA, 12, Font.ITALIC, BaseColor.BLACK);
                Font headerFont = new Font(Font.FontFamily.HELVETICA, 12, Font.ITALIC, BaseColor.GRAY);

//                BaseFont unicodeFont = BaseFont.createFont("Calibri", BaseFont.IDENTITY_H, BaseFont.EMBEDDED);

//                Font titleFont = new Font(unicodeFont, 18, Font.BOLD, BaseColor.BLACK);
//                Font subtitleFont = new Font(unicodeFont, 14, Font.BOLD, BaseColor.BLUE);
//                Font labelFont = new Font(unicodeFont, 12, Font.NORMAL, BaseColor.BLACK);
//                Font valueFont = new Font(unicodeFont, 12, Font.ITALIC, BaseColor.BLACK);
//                Font passedStatusFont = new Font(unicodeFont, 13, Font.ITALIC, BaseColor.GREEN);
//                Font failedStatusFont = new Font(unicodeFont, 13, Font.ITALIC, BaseColor.RED);
//                Font failedFont = new Font(unicodeFont, 12, Font.ITALIC, BaseColor.RED);
//                Font foterFont = new Font(unicodeFont, 12, Font.ITALIC, BaseColor.BLACK);
//                Font headerFont = new Font(unicodeFont, 12, Font.ITALIC, BaseColor.GRAY);

                Paragraph company = new Paragraph(examination.getLine().getInspectionStation().getCompany().getName() + " - " + examination.getLine().getInspectionStation().getName(), headerFont);
                company.setAlignment(Element.ALIGN_CENTER);
                document.add(company);

                Paragraph lineSeparator = new Paragraph();
                LineSeparator line = new LineSeparator();
                line.setPercentage(100f);
                line.setAlignment(Element.ALIGN_CENTER);
                lineSeparator.add(line);
                document.add(lineSeparator);

                Paragraph title = new Paragraph("Izvještaj", titleFont);
                title.setSpacingBefore(15);
                title.setAlignment(Element.ALIGN_CENTER);
                document.add(title);

                Paragraph vehicleSubtitle = new Paragraph("Podaci o vozilu", subtitleFont);
                document.add(vehicleSubtitle);
                Paragraph vehicle = new Paragraph();
                vehicle.setIndentationLeft(10);
                vehicle.add(new Chunk("Vlasnik: ", labelFont));
                vehicle.add(new Chunk(examination.getVehicle().getOwner().getFirstname() + " " + examination.getVehicle().getOwner().getLastname(), valueFont));
                vehicle.add("\n");
                vehicle.add(new Chunk("Tablice: ", labelFont));
                vehicle.add(new Chunk(examination.getLicencePlates(),valueFont));
                vehicle.add("\n");
                vehicle.add(new Chunk("Tip vozila: ", labelFont));
                vehicle.add(new Chunk(examination.getType().toString(), valueFont));
                vehicle.add("\n");
                vehicle.add(new Chunk("Proizvodjac: ", labelFont));
                vehicle.add(new Chunk(examination.getManufacturer(), valueFont));
                vehicle.add("\n");
                vehicle.add(new Chunk("Model: ", labelFont));
                vehicle.add(new Chunk(examination.getModel(), valueFont));
                vehicle.add("\n");
                vehicle.add(new Chunk("Godina: ", labelFont));
                vehicle.add(new Chunk(Integer.toString(examination.getProductionYear()), valueFont));
                vehicle.add("\n");
                vehicle.add(new Chunk("Boja: ", labelFont));
                vehicle.add(new Chunk(examination.getColor(), valueFont));
                vehicle.add("\n");
                vehicle.add(new Chunk("Motor: ", labelFont));
                vehicle.add(new Chunk(examination.getEngine().toString(), valueFont));
                vehicle.add("\n");
                vehicle.add(new Chunk("Klasa: ", labelFont));
                vehicle.add(new Chunk("Euro " + examination.getEmissionClass(), valueFont));

                if (examination.getType().equals(VehicleType.CAR)) {
                    vehicle.add("\n");
                    vehicle.add(new Chunk("Zapremina motora: ", labelFont));
                    vehicle.add(new Chunk(examination.getEngineVolume() + " cm3", valueFont));
                    vehicle.add("\n");
                    vehicle.add(new Chunk("Snaga motora: ", labelFont));
                    vehicle.add(new Chunk(examination.getEnginePower() + " hp", valueFont));
                } else if (examination.getType().equals(VehicleType.CARGO)) {
                    vehicle.add("\n");
                    vehicle.add(new Chunk("Masa vozila: ", labelFont));
                    vehicle.add(new Chunk(examination.getMass() + " kg", valueFont));
                    vehicle.add("\n");
                    vehicle.add(new Chunk("Max nosivost: ", labelFont));
                    vehicle.add(new Chunk(examination.getLoadMax() + " kg", valueFont));
                } else if (examination.getType().equals(VehicleType.MOTORBIKE)) {
                    vehicle.add("\n");
                    vehicle.add(new Chunk("Zapremina motora: ", labelFont));
                    vehicle.add(new Chunk(examination.getEngineVolume() + " cm3", valueFont));
                }
                document.add(vehicle);

                Paragraph criteriaSubtitle = new Paragraph("Stanje sa pregleda", subtitleFont);
                document.add(criteriaSubtitle);
                Paragraph stats = new Paragraph();
                stats.setIndentationLeft(10);
                if (examination.getRecord().getCriteria().stream().anyMatch(c -> c.isSatisfied())) {
                    stats.add(new Chunk("Zadovoljeno: ", labelFont));
                    for (Criteria c : examination.getRecord().getCriteria())
                        if (c.isSatisfied())
                            stats.add(new Chunk(c.getName() + ", ", valueFont));
                    stats.add("\n");
                }
                if (examination.getRecord().getCriteria().stream().anyMatch(c -> !c.isSatisfied())) {

                    stats.add(new Chunk("Nije zadovoljeno: ",labelFont));
                    for (Criteria c : examination.getRecord().getCriteria())
                        if (!c.isSatisfied()){
                            stats.add(new Chunk(c.getName(), failedFont));
                            if(!c.getDescription().isEmpty())
                                stats.add(new Chunk(" ( "+c.getDescription()+" ), ", valueFont));
                            else
                                stats.add(new Chunk(", ", valueFont));
                        }
                }
                document.add(stats);

                Paragraph overallSubtitle = new Paragraph("Rezime", subtitleFont);
                document.add(overallSubtitle);

                Paragraph overall = new Paragraph();
                overall.setIndentationLeft(10);
                overall.add(new Chunk("Vrijeme: ", labelFont));
                overall.add(new Chunk(examination.getPeriod(), valueFont));
                overall.add("\n");
                overall.add(new Chunk("Cijena: ", labelFont));
                overall.add(new Chunk(examination.getPrice() + " " + priceList.getCurrency(), valueFont));
                overall.add("\n");
                overall.add(new Chunk("Malus: ", labelFont));
                overall.add(new Chunk(examination.getMalus()*100 + "%", valueFont));
                overall.add("\n");
                overall.add(new Chunk("Status: ", labelFont));
                boolean status = examination.getRecord().getCriteria().stream().map(Criteria::isSatisfied).reduce(true, (c1, c2) -> c1 && c2);
                overall.add(new Chunk(status ? "ZADOVOLJIO" : "NIJE ZADOVOLJIO", status ? passedStatusFont : failedStatusFont));
                overall.add("\n");
                overall.add(new Chunk("Opcije: ", labelFont));
                if (examination.isRegistration())
                    overall.add(new Chunk("registracija" + (examination.isFirst() ? " (prvi put), " : ", "), valueFont));
                if (examination.isGreenCard())
                    overall.add(new Chunk("zeleni karton, ", valueFont));
                if (examination.isNewPlates())
                    overall.add(new Chunk("nove tablice, ", valueFont));
                if (examination.isOwnerCert())
                    overall.add(new Chunk("potvrda o vlasništvu, ", valueFont));
                if (examination.isRegCert())
                    overall.add(new Chunk("potvrda o registraciji", valueFont));
                overall.add("\n");
                if (examination.getRecord().getDescription() != null && !examination.getRecord().getDescription().isEmpty())
                    overall.add(new Chunk("Napomena: ", labelFont));
                document.add(overall);
                overall.setSpacingAfter(30);
                overall.add("\n");
                if (examination.getRecord().getDescription() != null && !examination.getRecord().getDescription().isEmpty()) {
                    Paragraph desc = new Paragraph(examination.getRecord().getDescription(), valueFont);
                    desc.setIndentationLeft(30);
                    document.add(desc);
                }
                Paragraph signature=new Paragraph();
                signature.setSpacingBefore(30);
                LineSeparator signatureLine = new LineSeparator();
                signatureLine.setPercentage(25f);
                signatureLine.setAlignment(Element.ALIGN_RIGHT);
                signature.add(signatureLine);
                document.add(signature);
                Paragraph supervisor = new Paragraph(examination.getSupervisor().getFirstname() + " " + examination.getSupervisor().getLastname(), foterFont);
                supervisor.setAlignment(Element.ALIGN_RIGHT);
                supervisor.setSpacingBefore(10);
                document.add(supervisor);
                Paragraph time = new Paragraph(examination.getTime().toString().split("T")[0] + " " + examination.getTime().toString().split("T")[1].split(":")[0] + ":" + examination.getTime().toString().split("T")[1].split(":")[1], foterFont);
                time.setAlignment(Element.ALIGN_RIGHT);
                document.add(time);

                document.close();
                return baos.toByteArray();
            }
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
