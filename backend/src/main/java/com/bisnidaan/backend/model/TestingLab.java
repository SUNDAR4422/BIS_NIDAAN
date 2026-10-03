package com.bisnidaan.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Column;
import lombok.Data;
import java.time.ZonedDateTime;
import java.util.UUID;

@Entity
@Table(name = "testing_labs")
@Data
public class TestingLab {
    @Id
    private UUID id;
    
    @Column(nullable = false)
    private String name;
    
    @Column(nullable = false, unique = true)
    private String certificationId; // BIS Recognition ID
    
    @Column(nullable = false)
    private String address;
    
    private String contactEmail;
    private String contactPhone;
    
    @Column(nullable = false)
    private Boolean isActive;
    
    private ZonedDateTime createdAt;
}
