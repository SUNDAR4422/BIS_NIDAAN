package com.bisnidaan.backend.repository;

import com.bisnidaan.backend.model.SafetyAlert;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;
import java.util.List;

public interface SafetyAlertRepository extends JpaRepository<SafetyAlert, UUID> {
    List<SafetyAlert> findByProductId(UUID productId);
}
