package com.example.Ecommerce.service;

import com.example.Ecommerce.entity.ContactMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@Service
public class EmailService {
    
    @Autowired
    private JavaMailSender mailSender;
    
    @Value("${spring.mail.username}")
    private String fromEmail;
    
    @Value("${contact.email:varunbali47@gmail.com}")
    private String contactEmail;
    
    public void sendContactFormNotification(ContactMessage contactMessage) throws MessagingException {
        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "UTF-8");
        
        helper.setFrom(fromEmail);
        helper.setTo(contactEmail);
        helper.setSubject("New Contact Form Message: " + contactMessage.getSubject());
        
        String htmlContent = buildContactNotificationEmail(contactMessage);
        helper.setText(htmlContent, true);
        
        mailSender.send(mimeMessage);
    }
    
    public void sendAutoReply(ContactMessage contactMessage) throws MessagingException {
        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "UTF-8");
        
        helper.setFrom(fromEmail);
        helper.setTo(contactMessage.getEmail());
        helper.setSubject("Thank you for contacting ShopSphere");
        
        String htmlContent = buildAutoReplyEmail(contactMessage);
        helper.setText(htmlContent, true);
        
        mailSender.send(mimeMessage);
    }
    
    private String buildContactNotificationEmail(ContactMessage contactMessage) {
        return """
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #3B82F6;">New Contact Form Message</h2>
                
                <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                    <h3 style="margin-top: 0; color: #333;">Message Details</h3>
                    <p><strong>Name:</strong> %s %s</p>
                    <p><strong>Email:</strong> %s</p>
                    <p><strong>Subject:</strong> %s</p>
                </div>
                
                <div style="background-color: #ffffff; padding: 20px; border: 1px solid #e9ecef; border-radius: 8px;">
                    <h4 style="color: #333; margin-top: 0;">Message:</h4>
                    <p style="line-height: 1.6; color: #555;">%s</p>
                </div>
                
                <div style="margin-top: 20px; padding: 15px; background-color: #e8f5e8; border-radius: 8px;">
                    <p style="margin: 0; color: #28a745; font-size: 14px;">
                        <strong>Reply to:</strong> %s
                    </p>
                </div>
                
                <hr style="margin: 30px 0; border: none; border-top: 1px solid #e9ecef;">
                
                <p style="font-size: 12px; color: #6c757d; text-align: center;">
                    This message was sent from the ShopSphere contact form.
                </p>
            </div>
            """.formatted(
                contactMessage.getFirstName(),
                contactMessage.getLastName(),
                contactMessage.getEmail(),
                contactMessage.getSubject(),
                contactMessage.getMessage().replace("\n", "<br>"),
                contactMessage.getEmail()
            );
    }
    
    private String buildAutoReplyEmail(ContactMessage contactMessage) {
        return """
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #3B82F6;">Thank you for contacting us!</h2>
                
                <p>Dear %s,</p>
                
                <p>We have received your message and appreciate you taking the time to contact us.</p>
                
                <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                    <h3 style="margin-top: 0; color: #333;">Your Message:</h3>
                    <p><strong>Subject:</strong> %s</p>
                    <p style="margin-top: 15px;"><strong>Message:</strong></p>
                    <p style="background-color: #ffffff; padding: 15px; border-radius: 4px; border-left: 4px solid #3B82F6;">
                        %s
                    </p>
                </div>
                
                <p>Our team will review your message and get back to you within 24-48 hours.</p>
                
                <p>If you have any urgent concerns, please don't hesitate to call us at <strong>+91 9996094192</strong>.</p>
                
                <p>Best regards,<br>
                <strong>The ShopSphere Team</strong></p>
                
                <hr style="margin: 30px 0; border: none; border-top: 1px solid #e9ecef;">
                
                <p style="font-size: 12px; color: #6c757d;">
                    This is an automated response. Please do not reply to this email.<br>
                    For direct contact, email us at: %s
                </p>
            </div>
            """.formatted(
                contactMessage.getFirstName(),
                contactMessage.getSubject(),
                contactMessage.getMessage().replace("\n", "<br>"),
                contactEmail
            );
    }
}