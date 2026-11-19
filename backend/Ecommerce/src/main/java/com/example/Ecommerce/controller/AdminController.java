package com.example.Ecommerce.controller;

import com.example.Ecommerce.entity.ContactMessage;
import com.example.Ecommerce.entity.Order;
import com.example.Ecommerce.entity.Product;
import com.example.Ecommerce.entity.User;
import com.example.Ecommerce.repository.ContactMessageRepository;
import com.example.Ecommerce.repository.OrderRepository;
import com.example.Ecommerce.repository.ProductRepository;
import com.example.Ecommerce.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/admin")
public class AdminController {

    private final UserRepository userRepository;
    private final ProductRepository productRepository;
    private final OrderRepository orderRepository;
    private final ContactMessageRepository contactMessageRepository;

    public AdminController(UserRepository userRepository, ProductRepository productRepository,
                           OrderRepository orderRepository, ContactMessageRepository contactMessageRepository) {
        this.userRepository = userRepository;
        this.productRepository = productRepository;
        this.orderRepository = orderRepository;
        this.contactMessageRepository = contactMessageRepository;
    }

    private ResponseEntity<?> requireAdmin(Authentication authentication) {
        if (authentication == null || !(authentication.getPrincipal() instanceof User user)
                || !"ADMIN".equalsIgnoreCase(user.getRole())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(Map.of("error", "Admin access required"));
        }
        return null;
    }

    @GetMapping("/dashboard")
    public ResponseEntity<?> dashboard(Authentication authentication) {
        ResponseEntity<?> denied = requireAdmin(authentication);
        if (denied != null) return denied;

        List<User> users = userRepository.findAll();
        List<Product> products = productRepository.findAll();
        List<Order> orders = orderRepository.findAll();
        List<ContactMessage> contacts = contactMessageRepository.findAll();

        Set<Order.OrderStatus> paidStatuses = Set.of(
                Order.OrderStatus.PAID,
                Order.OrderStatus.PROCESSING,
                Order.OrderStatus.SHIPPED,
                Order.OrderStatus.OUT_FOR_DELIVERY,
                Order.OrderStatus.DELIVERED
        );

        double revenue = orders.stream()
                .filter(order -> paidStatuses.contains(order.getStatus()))
                .map(Order::getTotalAmount)
                .filter(Objects::nonNull)
                .mapToDouble(Double::doubleValue)
                .sum();

        long lowStockCount = products.stream()
                .filter(product -> product.getStockQuantity() != null && product.getStockQuantity() <= 10)
                .count();

        Map<String, Double> categoryRevenue = new LinkedHashMap<>();
        for (Order order : orders) {
            if (!paidStatuses.contains(order.getStatus()) || order.getOrderItems() == null) continue;
            for (var item : order.getOrderItems()) {
                Product product = item.getProductId() == null ? null
                        : productRepository.findById(item.getProductId()).orElse(null);
                if (product == null) continue;
                String category = product.getCategory();
                double sale = item.getPrice() * item.getQuantity();
                categoryRevenue.merge(category, sale, Double::sum);
            }
        }

        List<Map<String, Object>> recentOrders = orders.stream()
                .sorted(Comparator.comparing(Order::getCreatedAt,
                        Comparator.nullsLast(Comparator.reverseOrder())))
                .limit(5)
                .map(order -> {
                    Map<String, Object> row = new LinkedHashMap<>();
                    row.put("id", order.getId());
                    row.put("customerName", order.getCustomerName());
                    row.put("customerEmail", order.getCustomerEmail());
                    row.put("totalAmount", order.getTotalAmount());
                    row.put("status", order.getStatus());
                    row.put("createdAt", order.getCreatedAt());
                    return row;
                }).collect(Collectors.toList());

        Map<String, Object> data = new LinkedHashMap<>();
        data.put("totalUsers", users.size());
        data.put("totalProducts", products.size());
        data.put("totalOrders", orders.size());
        data.put("revenue", revenue);
        data.put("lowStockCount", lowStockCount);
        data.put("unrepliedMessages", contacts.stream().filter(c -> !Boolean.TRUE.equals(c.getIsReplied())).count());
        data.put("categoryRevenue", categoryRevenue);
        data.put("recentOrders", recentOrders);
        data.put("lowStockProducts", products.stream()
                .filter(product -> product.getStockQuantity() != null && product.getStockQuantity() <= 10)
                .sorted(Comparator.comparing(Product::getStockQuantity))
                .limit(10)
                .toList());
        return ResponseEntity.ok(data);
    }

    @GetMapping("/orders")
    public ResponseEntity<?> orders(Authentication authentication) {
        ResponseEntity<?> denied = requireAdmin(authentication);
        if (denied != null) return denied;
        List<Order> orders = orderRepository.findAll();
        orders.sort(Comparator.comparing(Order::getCreatedAt,
                Comparator.nullsLast(Comparator.reverseOrder())));
        return ResponseEntity.ok(orders);
    }

    @GetMapping("/users")
    public ResponseEntity<?> users(Authentication authentication) {
        ResponseEntity<?> denied = requireAdmin(authentication);
        if (denied != null) return denied;
        return ResponseEntity.ok(userRepository.findAll());
    }

    @PutMapping("/users/{id}/role")
    public ResponseEntity<?> changeRole(@PathVariable String id,
                                        @RequestBody Map<String, String> body,
                                        Authentication authentication) {
        ResponseEntity<?> denied = requireAdmin(authentication);
        if (denied != null) return denied;

        String role = body.get("role");
        if (role == null || !(role.equalsIgnoreCase("USER") || role.equalsIgnoreCase("ADMIN"))) {
            return ResponseEntity.badRequest().body(Map.of("error", "Role must be USER or ADMIN"));
        }

        Optional<User> existing = userRepository.findById(id);
        if (existing.isEmpty()) return ResponseEntity.notFound().build();
        User user = existing.get();
        user.setRole(role.toUpperCase());
        return ResponseEntity.ok(userRepository.save(user));
    }

    @GetMapping("/contacts")
    public ResponseEntity<?> contacts(Authentication authentication) {
        ResponseEntity<?> denied = requireAdmin(authentication);
        if (denied != null) return denied;
        return ResponseEntity.ok(contactMessageRepository.findAllByOrderByCreatedAtDesc());
    }

    @PutMapping("/contacts/{id}/reply")
    public ResponseEntity<?> markReplied(@PathVariable String id, Authentication authentication) {
        ResponseEntity<?> denied = requireAdmin(authentication);
        if (denied != null) return denied;
        Optional<ContactMessage> existing = contactMessageRepository.findById(id);
        if (existing.isEmpty()) return ResponseEntity.notFound().build();
        ContactMessage message = existing.get();
        message.setIsReplied(true);
        return ResponseEntity.ok(contactMessageRepository.save(message));
    }

    @PutMapping("/orders/{id}/shipment")
    public ResponseEntity<?> updateShipment(@PathVariable String id,
                                            @RequestBody Map<String, Object> shipment,
                                            Authentication authentication) {
        ResponseEntity<?> denied = requireAdmin(authentication);
        if (denied != null) return denied;

        Optional<Order> existing = orderRepository.findById(id);
        if (existing.isEmpty()) return ResponseEntity.notFound().build();

        try {
            Order order = existing.get();
            String statusValue = Objects.toString(shipment.get("status"), "").toUpperCase();
            order.setStatus(Order.OrderStatus.valueOf(statusValue));
            if (shipment.get("trackingNumber") != null) {
                order.setTrackingNumber(shipment.get("trackingNumber").toString());
            }
            if (shipment.get("carrier") != null) {
                order.setCarrier(shipment.get("carrier").toString());
            }
            if (shipment.get("estimatedDeliveryDays") != null) {
                int days = ((Number) shipment.get("estimatedDeliveryDays")).intValue();
                order.setEstimatedDelivery(LocalDateTime.now().plusDays(Math.max(days, 1)));
            }
            if (Set.of(Order.OrderStatus.SHIPPED, Order.OrderStatus.OUT_FOR_DELIVERY).contains(order.getStatus())) {
                order.setShippedAt(LocalDateTime.now());
            }
            if (order.getStatus() == Order.OrderStatus.DELIVERED) {
                order.setDeliveredAt(LocalDateTime.now());
            }
            order.setUpdatedAt(LocalDateTime.now());
            return ResponseEntity.ok(orderRepository.save(order));
        } catch (IllegalArgumentException | NullPointerException e) {
            return ResponseEntity.badRequest().body(Map.of("error", "Invalid shipment status"));
        }
    }
}
