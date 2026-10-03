package com.bisnidaan.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Column;
import lombok.Data;
import java.time.ZonedDateTime;
import java.util.UUID;

@Entity
@Table(name = "complaints")
@Data
public class Complaint {
    @Id
    private UUID id;
    
    private UUID consumerId; // References User
    private UUID productId; // References Product
    private UUID batchId; // Optional: References Batch
    
    @Column(nullable = false)
    private String category; // e.g., "Quality Issue", "Adulteration", "Missing Certification"
    
    @Column(nullable = false, length = 1000)
    private String description;
    
    @Column(nullable = false)
    private String status; // "Open", "Under Investigation", "Resolved", "Forwarded to Manufacturer"
    
    @Column(unique = true, nullable = false)
    private String trackingId; // e.g. CMP-2024-ABCDEF
    
    private ZonedDateTime createdAt;
    private ZonedDateTime updatedAt;
}
