package com.bisnidaan.backend.repository;

import com.bisnidaan.backend.model.Complaint;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;
import java.util.List;

public interface ComplaintRepository extends JpaRepository<Complaint, UUID> {
    List<Complaint> findByProductId(UUID productId);
    List<Complaint> findByConsumerId(UUID consumerId);
}
