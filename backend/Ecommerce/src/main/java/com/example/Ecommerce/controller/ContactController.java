package com.example.Ecommerce.controller;

import com.example.Ecommerce.entity.ContactMessage;
import com.example.Ecommerce.repository.ContactMessageRepository;
import com.example.Ecommerce.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/contact")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001"})
public class ContactController {
    
    @Autowired
    private ContactMessageRepository contactMessageRepository;
    
    @Autowired
    private EmailService emailService;
    
    // Submit contact form
    @PostMapping
    public ResponseEntity<Map<String, String>> submitContactForm(@Valid @RequestBody ContactMessage contactMessage) {
        try {
            // Save the contact message to database
            ContactMessage savedMessage = contactMessageRepository.save(contactMessage);
            
            // Send email notification
            emailService.sendContactFormNotification(savedMessage);
            
            // Send auto-reply to user
            emailService.sendAutoReply(savedMessage);
            
            Map<String, String> response = new HashMap<>();
            response.put("message", "Message sent successfully!");
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "Failed to send message. Please try again later.");
            
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }
    
    // Get all contact messages (Admin functionality)
    @GetMapping
    public ResponseEntity<List<ContactMessage>> getAllMessages() {
        try {
            List<ContactMessage> messages = contactMessageRepository.findAllByOrderByCreatedAtDesc();
            return ResponseEntity.ok(messages);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    // Get unreplied messages (Admin functionality)
    @GetMapping("/unreplied")
    public ResponseEntity<List<ContactMessage>> getUnrepliedMessages() {
        try {
            List<ContactMessage> messages = contactMessageRepository.findByIsRepliedFalseOrderByCreatedAtAsc();
            return ResponseEntity.ok(messages);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    // Mark message as replied (Admin functionality)
    @PutMapping("/{id}/reply")
    public ResponseEntity<ContactMessage> markAsReplied(@PathVariable String id) {
        try {
            return contactMessageRepository.findById(id)
                .map(message -> {
                    message.setIsReplied(true);
                    ContactMessage updatedMessage = contactMessageRepository.save(message);
                    return ResponseEntity.ok(updatedMessage);
                })
                .orElse(ResponseEntity.notFound().build());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    // Get message by ID (Admin functionality)
    @GetMapping("/{id}")
    public ResponseEntity<ContactMessage> getMessageById(@PathVariable String id) {
        try {
            return contactMessageRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}