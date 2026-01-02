package com.example.Ecommerce.repository;

import com.example.Ecommerce.entity.Order;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface OrderRepository extends MongoRepository<Order, String> {
    
    // Find order by Razorpay order ID
    Optional<Order> findByRazorpayOrderId(String razorpayOrderId);
    
    // Find order by Razorpay payment ID
    Optional<Order> findByRazorpayPaymentId(String razorpayPaymentId);
    
    // Find orders by customer email
    List<Order> findByCustomerEmailOrderByCreatedAtDesc(String customerEmail);
    
    // Find orders by status
    List<Order> findByStatusOrderByCreatedAtDesc(Order.OrderStatus status);
}