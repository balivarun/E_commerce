package com.example.Ecommerce.service;

import com.example.Ecommerce.entity.Product;
import com.example.Ecommerce.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.AggregationResults;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {
    
    @Autowired
    private ProductRepository productRepository;
    
    @Autowired
    private MongoTemplate mongoTemplate;
    
    public List<String> findAllCategories() {
        Aggregation aggregation = Aggregation.newAggregation(
            Aggregation.group("category"),
            Aggregation.project("category").and("category").as("category"),
            Aggregation.sort(org.springframework.data.domain.Sort.by("category"))
        );
        
        AggregationResults<String> results = mongoTemplate.aggregate(
            aggregation, "products", String.class);
        
        return results.getMappedResults();
    }
    
    public List<Product> findProductsByCriteria(String category, String searchTerm, Double minPrice, Double maxPrice) {
        // Use different combinations based on what criteria are provided
        if (category != null && searchTerm != null && minPrice != null && maxPrice != null) {
            return productRepository.findByNameContainingIgnoreCaseAndCategoryIgnoreCaseAndPriceBetween(
                searchTerm, category, minPrice, maxPrice);
        } else if (category != null && searchTerm != null) {
            return productRepository.findByNameContainingIgnoreCaseAndCategoryIgnoreCase(searchTerm, category);
        } else if (searchTerm != null && minPrice != null && maxPrice != null) {
            return productRepository.findByNameContainingIgnoreCaseAndPriceBetween(searchTerm, minPrice, maxPrice);
        } else if (category != null) {
            return productRepository.findByCategoryIgnoreCase(category);
        } else if (searchTerm != null) {
            return productRepository.findByNameContainingIgnoreCase(searchTerm);
        } else if (minPrice != null && maxPrice != null) {
            return productRepository.findByPriceRange(minPrice, maxPrice);
        } else {
            return productRepository.findAll();
        }
    }
}