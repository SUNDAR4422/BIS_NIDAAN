package com.bisnidaan.backend.repository;

import com.bisnidaan.backend.model.Batch;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;

import java.util.Optional;

public interface BatchRepository extends JpaRepository<Batch, UUID> {
    Optional<Batch> findByBatchNumber(String batchNumber);
}
