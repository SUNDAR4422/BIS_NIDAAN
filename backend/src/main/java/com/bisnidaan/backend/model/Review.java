package com.bisnidaan.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Column;
import lombok.Data;
import java.time.ZonedDateTime;
import java.util.UUID;

@Entity
@Table(name = "reviews")
@Data
public class Review {
    @Id
    private UUID id;
    
    private UUID consumerId; // References User
    private UUID productId; // References Product
    
    @Column(nullable = false)
    private Integer rating; // 1 to 5
    
    @Column(length = 1000)
    private String comment;
    
    private Boolean verifiedPurchase; // True if scanned DataMatrix before review
    
    private ZonedDateTime createdAt;
}
