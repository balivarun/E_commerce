package com.example.Ecommerce.controller;

import com.example.Ecommerce.entity.Order;
import com.example.Ecommerce.repository.OrderRepository;
import com.example.Ecommerce.service.RazorpayService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001"})
public class OrderController {
    
    @Autowired
    private OrderRepository orderRepository;
    
    @Autowired
    private RazorpayService razorpayService;
    
    // Create Razorpay order
    @PostMapping("/create-order")
    public ResponseEntity<Map<String, Object>> createOrder(@RequestBody Map<String, Object> orderRequest) {
        try {
            Double amount = ((Number) orderRequest.get("amount")).doubleValue();
            String currency = (String) orderRequest.getOrDefault("currency", "INR");
            
            // Create order in Razorpay
            Map<String, Object> razorpayOrder = razorpayService.createOrder(amount, currency);
            
            // Save order in database
            Order order = new Order();
            order.setRazorpayOrderId((String) razorpayOrder.get("id"));
            order.setTotalAmount(amount);
            order.setCurrency(currency);
            order.setStatus(Order.OrderStatus.CREATED);
            
            orderRepository.save(order);
            
            return ResponseEntity.ok(razorpayOrder);
        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("error", "Failed to create order: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }
    
    // Verify payment
    @PostMapping("/verify-payment")
    public ResponseEntity<Map<String, Object>> verifyPayment(@RequestBody Map<String, String> paymentDetails) {
        try {
            String orderId = paymentDetails.get("orderId");
            String paymentId = paymentDetails.get("paymentId");
            String signature = paymentDetails.get("signature");
            
            // Verify payment signature
            boolean isValidSignature = razorpayService.verifyPaymentSignature(orderId, paymentId, signature);
            
            Map<String, Object> response = new HashMap<>();
            
            if (isValidSignature) {
                // Update order status in database
                Order order = orderRepository.findByRazorpayOrderId(orderId)
                    .orElseThrow(() -> new RuntimeException("Order not found"));
                
                order.setRazorpayPaymentId(paymentId);
                order.setRazorpaySignature(signature);
                order.setStatus(Order.OrderStatus.PAID);
                
                orderRepository.save(order);
                
                response.put("success", true);
                response.put("message", "Payment verified successfully");
                response.put("orderId", order.getId());
                
                return ResponseEntity.ok(response);
            } else {
                // Update order status to failed
                Order order = orderRepository.findByRazorpayOrderId(orderId)
                    .orElse(null);
                
                if (order != null) {
                    order.setStatus(Order.OrderStatus.FAILED);
                    orderRepository.save(order);
                }
                
                response.put("success", false);
                response.put("message", "Payment verification failed");
                
                return ResponseEntity.badRequest().body(response);
            }
        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("success", false);
            errorResponse.put("message", "Payment verification error: " + e.getMessage());
            
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }
    
    // Get order by ID
    @GetMapping("/orders/{id}")
    public ResponseEntity<Order> getOrder(@PathVariable String id) {
        try {
            return orderRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    // Get orders by email (for customer order history)
    @GetMapping("/orders")
    public ResponseEntity<Object> getOrdersByEmail(@RequestParam String email) {
        try {
            return ResponseEntity.ok(orderRepository.findByCustomerEmailOrderByCreatedAtDesc(email));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}