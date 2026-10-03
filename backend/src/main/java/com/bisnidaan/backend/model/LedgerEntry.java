package com.bisnidaan.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Column;
import lombok.Data;
import java.time.ZonedDateTime;
import java.util.UUID;

@Entity
@Table(name = "ledger")
@Data
public class LedgerEntry {
    @Id
    private UUID id;
    
    @Column(nullable = false)
    private String previousHash;
    
    @Column(nullable = false)
    private String payloadHash;
    
    private ZonedDateTime timestamp;
    
    private String signature;
    
    @Column(nullable = false)
    private String entryHash;
}
