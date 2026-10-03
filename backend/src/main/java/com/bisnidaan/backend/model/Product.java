package com.bisnidaan.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Column;
import lombok.Data;
import java.time.ZonedDateTime;
import java.util.UUID;

@Entity
@Table(name = "products")
@Data
public class Product {
    @Id
    private UUID id;
    
    private UUID manufacturerId;
    
    @Column(nullable = false)
    private String name;
    
    @Column(nullable = false)
    private String isStandardNumber;
    
    @Column(nullable = false)
    private String description;
    
    private ZonedDateTime createdAt;
    private ZonedDateTime updatedAt;
}
