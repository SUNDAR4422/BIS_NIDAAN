package com.bisnidaan.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Column;
import lombok.Data;
import java.time.ZonedDateTime;
import java.util.UUID;

@Entity
@Table(name = "safety_alerts")
@Data
public class SafetyAlert {
    @Id
    private UUID id;
    
    private UUID productId; // The product being recalled/alerted
    
    @Column(nullable = false)
    private String alertType; // "Recall", "Safety Warning", "Adulteration Alert"
    
    @Column(nullable = false, length = 2000)
    private String message;
    
    private Boolean isGlobal; // If true, applies to all batches. If false, check affectedBatches.
    
    @Column(length = 1000)
    private String affectedBatches; // Comma separated list of batch numbers if not global
    
    private ZonedDateTime issuedAt;
}
