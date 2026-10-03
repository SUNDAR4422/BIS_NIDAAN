package com.bisnidaan.backend.repository;

import com.bisnidaan.backend.model.TestingLab;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;

public interface TestingLabRepository extends JpaRepository<TestingLab, UUID> {
}
