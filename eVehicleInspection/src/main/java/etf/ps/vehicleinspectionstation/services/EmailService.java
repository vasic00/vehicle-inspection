package etf.ps.vehicleinspectionstation.services;

public interface EmailService {
    boolean sendEmail (long recepientId, String subject, String body);
}
