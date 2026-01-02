package com.example.Ecommerce.repository;

import com.example.Ecommerce.entity.ContactMessage;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ContactMessageRepository extends MongoRepository<ContactMessage, String> {
    
    // Find contact messages by email
    List<ContactMessage> findByEmailOrderByCreatedAtDesc(String email);
    
    // Find unreplied messages
    List<ContactMessage> findByIsRepliedFalseOrderByCreatedAtAsc();
    
    // Find all messages ordered by creation date
    List<ContactMessage> findAllByOrderByCreatedAtDesc();
}