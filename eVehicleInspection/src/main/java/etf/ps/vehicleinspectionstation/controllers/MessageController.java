package etf.ps.vehicleinspectionstation.controllers;

import etf.ps.vehicleinspectionstation.dto.MessageDto;
import etf.ps.vehicleinspectionstation.services.EmailService;
import etf.ps.vehicleinspectionstation.services.MessageService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/messages")
public class MessageController {
    private final MessageService messageService;
    private final EmailService emailService;

    public MessageController(MessageService messageService, EmailService emailService) {
        this.messageService = messageService;
        this.emailService = emailService;
    }

    @PutMapping("/{msg}")
    public ResponseEntity<?> markAsRead(@PathVariable("msg") long msg) {
        return new ResponseEntity<>(messageService.markAsRead(msg) ? HttpStatus.OK : HttpStatus.NOT_FOUND);
    }

    @PostMapping
    public ResponseEntity<?> receive(@RequestBody MessageDto messageDto) {
        emailService.sendEmail(messageDto.getId(),messageDto.getTitle(), messageDto.getContent());
        return new ResponseEntity<>(messageService.receive(messageDto) ? HttpStatus.OK : HttpStatus.NOT_FOUND);
    }
}
