package com.bisnidaan.backend.repository;

import com.bisnidaan.backend.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, UUID> {
    List<Product> findByNameContainingIgnoreCase(String name);
}
