package etf.ps.vehicleinspectionstation.services.impl;

import etf.ps.vehicleinspectionstation.dao.CustomerDao;
import etf.ps.vehicleinspectionstation.dao.MessageDao;
import etf.ps.vehicleinspectionstation.dto.MessageDto;
import etf.ps.vehicleinspectionstation.model.Customer;
import etf.ps.vehicleinspectionstation.model.Message;
import etf.ps.vehicleinspectionstation.services.MessageService;
import etf.ps.vehicleinspectionstation.util.CustomLogger;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Optional;

@Service
public class MessageServiceImpl implements MessageService {
    private final MessageDao messageDao;
    private final CustomerDao customerDao;
    private final CustomLogger logger;

    public MessageServiceImpl(MessageDao messageDao, CustomerDao customerDao, CustomLogger logger) {
        this.messageDao = messageDao;
        this.customerDao = customerDao;
        this.logger = logger;
    }

    @Override
    public boolean markAsRead(long msg) {
        Optional<Message> message=messageDao.findById(msg);
//        check if user from security context reads his msgs
        if(message.isPresent()){
            message.get().set_read(true);
            messageDao.saveAndFlush(message.get());
            return true;
        }else{
            logger.log("Invalid message id ("+msg+")!",false);
            return false;
        }
    }

    @Override
    public boolean receive(MessageDto messageDto) {
        try {
            Customer customer = customerDao.findById(messageDto.getId()).get();
            Message message = new Message();
            message.setRecipient(customer);
            message.setContent(messageDto.getContent());
            message.setTitle(messageDto.getTitle());
            message.setTime(new Date());
            message.set_read(false);
            message.setSender(messageDto.getSender());
            System.out.println(message.getId());
            messageDao.saveAndFlush(message);
            return true;
        }catch (Exception e){
            e.printStackTrace();
            logger.log("Unknown recepient!",true);
            return false;
        }
    }
}
