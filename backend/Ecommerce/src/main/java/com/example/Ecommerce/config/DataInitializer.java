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
        Product laptop = new Product("MacBook Air M2", 89999.0, "Apple MacBook Air with M2 chip, 8-core CPU, 8-core GPU, 8GB unified memory, 256GB SSD storage", "electronics", "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=904&h=840&fit=crop");
        laptop.setOriginalPrice(99999.0);
        laptop.setRating(4.8);
        laptop.setReviewCount(245);
        laptop.setIsNew(true);
        laptop.setIsOnSale(true);
        laptop.setStockQuantity(50);
        
        Product smartphone = new Product("iPhone 14 Pro", 99999.0, "iPhone 14 Pro with A16 Bionic chip, 6.1-inch Super Retina XDR display, Pro camera system", "electronics", "https://images.unsplash.com/photo-1678685888221-cda773a3dcdb?w=940&h=1112&fit=crop");
        smartphone.setRating(4.9);
        smartphone.setReviewCount(189);
        smartphone.setIsNew(true);
        smartphone.setStockQuantity(75);
        
        Product headphones = new Product("AirPods Pro", 24999.0, "AirPods Pro (2nd generation) with Active Noise Cancellation, Transparency mode", "electronics", "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=572&h=572&fit=crop");
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
        
        // Electronics - additional
        Product smartwatch = new Product("Samsung Galaxy Watch 6", 27999.0, "Samsung Galaxy Watch 6 with advanced health monitoring, sleep tracking, and seamless Galaxy ecosystem integration", "electronics", "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=800&fit=crop");
        smartwatch.setOriginalPrice(31999.0);
        smartwatch.setRating(4.5);
        smartwatch.setReviewCount(132);
        smartwatch.setIsOnSale(true);
        smartwatch.setStockQuantity(90);

        Product tablet = new Product("iPad Air M1", 54999.0, "iPad Air with M1 chip, 10.9-inch Liquid Retina display, Touch ID, and all-day battery life", "electronics", "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&h=800&fit=crop");
        tablet.setRating(4.7);
        tablet.setReviewCount(198);
        tablet.setIsNew(true);
        tablet.setStockQuantity(65);

        Product speaker = new Product("JBL Flip 6 Speaker", 9999.0, "Portable Bluetooth speaker with powerful sound, IP67 waterproof rating, and 12 hours of playtime", "electronics", "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&h=800&fit=crop");
        speaker.setOriginalPrice(12999.0);
        speaker.setRating(4.4);
        speaker.setReviewCount(276);
        speaker.setIsOnSale(true);
        speaker.setStockQuantity(110);

        // Men's Clothing - additional
        Product jacket = new Product("Leather Bomber Jacket", 4999.0, "Premium faux leather bomber jacket with soft inner lining, perfect for layering in cool weather", "men's clothing", "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&h=800&fit=crop");
        jacket.setRating(4.6);
        jacket.setReviewCount(87);
        jacket.setIsNew(true);
        jacket.setStockQuantity(70);

        Product polo = new Product("Classic Polo Shirt", 1299.0, "Timeless cotton polo shirt with ribbed collar and two-button placket, available in multiple colors", "men's clothing", "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800&h=800&fit=crop");
        polo.setOriginalPrice(1599.0);
        polo.setRating(4.3);
        polo.setReviewCount(143);
        polo.setIsOnSale(true);
        polo.setStockQuantity(180);

        Product sneakers = new Product("Running Sneakers", 3499.0, "Lightweight mesh running sneakers with cushioned sole for maximum comfort during workouts", "men's clothing", "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=800&fit=crop");
        sneakers.setRating(4.5);
        sneakers.setReviewCount(201);
        sneakers.setIsNew(true);
        sneakers.setStockQuantity(95);

        // Women's Clothing - additional
        Product blouse = new Product("Silk Blouse", 1899.0, "Elegant silk blouse with relaxed fit and delicate button details, perfect for work or evening wear", "women's clothing", "https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=800&h=800&fit=crop");
        blouse.setOriginalPrice(2399.0);
        blouse.setRating(4.4);
        blouse.setReviewCount(92);
        blouse.setIsOnSale(true);
        blouse.setStockQuantity(100);

        Product handbag = new Product("Designer Handbag", 5999.0, "Stylish designer handbag with multiple compartments, detachable strap, and premium hardware", "women's clothing", "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&h=800&fit=crop");
        handbag.setRating(4.7);
        handbag.setReviewCount(156);
        handbag.setIsNew(true);
        handbag.setStockQuantity(45);

        Product scarf = new Product("Cashmere Scarf", 2499.0, "Luxuriously soft cashmere scarf, perfect for adding warmth and elegance to any outfit", "women's clothing", "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&h=800&fit=crop");
        scarf.setOriginalPrice(2999.0);
        scarf.setRating(4.6);
        scarf.setReviewCount(68);
        scarf.setIsOnSale(true);
        scarf.setStockQuantity(85);

        // Jewelry - additional
        Product bracelet = new Product("Diamond Tennis Bracelet", 7999.0, "Stunning diamond tennis bracelet with round-cut stones set in sterling silver", "jewelery", "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=800&h=800&fit=crop");
        bracelet.setRating(4.8);
        bracelet.setReviewCount(54);
        bracelet.setIsNew(true);
        bracelet.setStockQuantity(30);

        Product earrings = new Product("Pearl Drop Earrings", 1499.0, "Classic freshwater pearl drop earrings with gold-plated hooks, elegant for any occasion", "jewelery", "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&h=800&fit=crop");
        earrings.setOriginalPrice(1999.0);
        earrings.setRating(4.5);
        earrings.setReviewCount(112);
        earrings.setIsOnSale(true);
        earrings.setStockQuantity(70);

        Product watch = new Product("Rose Gold Watch", 4499.0, "Elegant rose gold analog watch with minimalist dial and genuine leather strap", "jewelery", "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800&h=800&fit=crop");
        watch.setRating(4.6);
        watch.setReviewCount(98);
        watch.setIsNew(true);
        watch.setStockQuantity(55);

        // Save all products
        productRepository.save(laptop);
        productRepository.save(smartphone);
        productRepository.save(headphones);
        productRepository.save(tshirt);
        productRepository.save(dress);
        productRepository.save(jeans);
        productRepository.save(necklace);
        productRepository.save(ring);
        productRepository.save(smartwatch);
        productRepository.save(tablet);
        productRepository.save(speaker);
        productRepository.save(jacket);
        productRepository.save(polo);
        productRepository.save(sneakers);
        productRepository.save(blouse);
        productRepository.save(handbag);
        productRepository.save(scarf);
        productRepository.save(bracelet);
        productRepository.save(earrings);
        productRepository.save(watch);

        System.out.println("Sample products initialized! Total: 20 products");
    }
}