package com.bisnidaan.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Column;
import lombok.Data;
import java.time.ZonedDateTime;
import java.util.UUID;

@Entity
@Table(name = "batches")
@Data
public class Batch {
    @Id
    private UUID id;
    
    private UUID productId;
    
    @Column(unique = true, nullable = false)
    private String batchNumber;
    
    private ZonedDateTime manufacturingDate;
    private ZonedDateTime expiryDate;
    
    @Column(nullable = false)
    private Integer unitCount;
    
    private String status;
    
    private String merkleRoot;
    
    private ZonedDateTime createdAt;
    private ZonedDateTime updatedAt;
}
