package com.example.Ecommerce.repository;

import com.example.Ecommerce.entity.Product;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends MongoRepository<Product, String> {
    
    // Find products by category
    List<Product> findByCategoryIgnoreCase(String category);
    
    // Find products by name containing search term (case insensitive)
    List<Product> findByNameContainingIgnoreCase(String searchTerm);
    
    // Find all unique categories
    @Query(value = "{}", fields = "{ category : 1, _id : 0 }")
    List<String> findAllCategories();
    
    // Find featured products (new or on sale)
    @Query("{ $or: [ { 'is_new': true }, { 'is_on_sale': true } ] }")
    List<Product> findFeaturedProducts();
    
    // Find products with stock
    @Query("{ 'stock_quantity': { $gt: 0 } }")
    List<Product> findAvailableProducts();
    
    // Find products by price range
    @Query("{ 'price': { $gte: ?0, $lte: ?1 } }")
    List<Product> findByPriceRange(Double minPrice, Double maxPrice);
    
    // Search products with multiple criteria using method name convention
    List<Product> findByNameContainingIgnoreCaseAndCategoryIgnoreCaseAndPriceBetween(
        String searchTerm, String category, Double minPrice, Double maxPrice
    );
    
    // Simple search by name and category
    List<Product> findByNameContainingIgnoreCaseAndCategoryIgnoreCase(String searchTerm, String category);
    
    // Search by name, price range
    List<Product> findByNameContainingIgnoreCaseAndPriceBetween(String searchTerm, Double minPrice, Double maxPrice);
}