package etf.ps.vehicleinspectionstation.services;

import etf.ps.vehicleinspectionstation.dto.MessageDto;

public interface MessageService {
    boolean markAsRead(long msg);
    boolean receive(MessageDto messageDto);
}
