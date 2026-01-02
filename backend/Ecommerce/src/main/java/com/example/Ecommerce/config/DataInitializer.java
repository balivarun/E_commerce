package com.example.Ecommerce.config;

import com.example.Ecommerce.entity.Product;
import com.example.Ecommerce.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {
    
    @Autowired
    private ProductRepository productRepository;
    
    @Override
    public void run(String... args) throws Exception {
        // Check if products already exist
        if (productRepository.count() == 0) {
            initializeProducts();
        }
    }
    
    private void initializeProducts() {
        // Electronics
        Product laptop = new Product("MacBook Air M2", 89999.0, "Apple MacBook Air with M2 chip, 8-core CPU, 8-core GPU, 8GB unified memory, 256GB SSD storage", "electronics", "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/macbook-air-midnight-select-20220606?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1653084303665");
        laptop.setOriginalPrice(99999.0);
        laptop.setRating(4.8);
        laptop.setReviewCount(245);
        laptop.setIsNew(true);
        laptop.setIsOnSale(true);
        laptop.setStockQuantity(50);
        
        Product smartphone = new Product("iPhone 14 Pro", 99999.0, "iPhone 14 Pro with A16 Bionic chip, 6.1-inch Super Retina XDR display, Pro camera system", "electronics", "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-14-pro-deep-purple-select?wid=940&hei=1112&fmt=png-alpha&.v=1660753440375");
        smartphone.setRating(4.9);
        smartphone.setReviewCount(189);
        smartphone.setIsNew(true);
        smartphone.setStockQuantity(75);
        
        Product headphones = new Product("AirPods Pro", 24999.0, "AirPods Pro (2nd generation) with Active Noise Cancellation, Transparency mode", "electronics", "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MQD83?wid=572&hei=572&fmt=jpeg&qlt=95&.v=1660803972361");
        headphones.setOriginalPrice(29999.0);
        headphones.setRating(4.7);
        headphones.setReviewCount(324);
        headphones.setIsOnSale(true);
        headphones.setStockQuantity(100);
        
        // Clothing
        Product tshirt = new Product("Cotton T-Shirt", 799.0, "Premium quality cotton t-shirt with comfortable fit. Perfect for casual wear", "men's clothing", "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80");
        tshirt.setOriginalPrice(999.0);
        tshirt.setRating(4.3);
        tshirt.setReviewCount(67);
        tshirt.setIsOnSale(true);
        tshirt.setStockQuantity(200);
        
        Product dress = new Product("Summer Dress", 1299.0, "Beautiful floral summer dress made from breathable cotton fabric", "women's clothing", "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80");
        dress.setRating(4.5);
        dress.setReviewCount(89);
        dress.setIsNew(true);
        dress.setStockQuantity(150);
        
        Product jeans = new Product("Denim Jeans", 1999.0, "Classic blue denim jeans with perfect fit and comfort", "men's clothing", "https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80");
        jeans.setOriginalPrice(2499.0);
        jeans.setRating(4.4);
        jeans.setReviewCount(156);
        jeans.setIsOnSale(true);
        jeans.setStockQuantity(120);
        
        // Jewelry
        Product necklace = new Product("Gold Necklace", 2999.0, "Elegant gold-plated necklace perfect for special occasions", "jewelery", "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80");
        necklace.setRating(4.6);
        necklace.setReviewCount(78);
        necklace.setStockQuantity(80);
        
        Product ring = new Product("Silver Ring", 899.0, "Beautiful silver ring with intricate design", "jewelery", "https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80");
        ring.setOriginalPrice(1199.0);
        ring.setRating(4.2);
        ring.setReviewCount(45);
        ring.setIsOnSale(true);
        ring.setStockQuantity(60);
        
        // Save all products
        productRepository.save(laptop);
        productRepository.save(smartphone);
        productRepository.save(headphones);
        productRepository.save(tshirt);
        productRepository.save(dress);
        productRepository.save(jeans);
        productRepository.save(necklace);
        productRepository.save(ring);
        
        System.out.println("Sample products initialized!");
    }
}