package etf.ps.vehicleinspectionstation.services.impl;

import etf.ps.vehicleinspectionstation.dao.CustomerDao;
import etf.ps.vehicleinspectionstation.model.Customer;
import etf.ps.vehicleinspectionstation.model.Message;
import etf.ps.vehicleinspectionstation.services.EmailService;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.Date;
@Service
public class EmailServiceImpl implements EmailService {

    private final JavaMailSender mailSender;
    private final CustomerDao customerDao;

    public EmailServiceImpl(JavaMailSender mailSender, CustomerDao customerDao) {
        this.mailSender = mailSender;
        this.customerDao = customerDao;
    }

    @Override
    public boolean sendEmail(long recepientId, String subject, String body) {
        try {
            Customer customer = customerDao.findById(recepientId).get();
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom("noreply@eVehicleInspection.com");
            message.setTo(customer.getEmail());
            message.setSubject(subject);
            message.setText(body);
            mailSender.send(message);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }
}
