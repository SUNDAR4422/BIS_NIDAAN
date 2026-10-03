package com.bisnidaan.backend.repository;

import com.bisnidaan.backend.model.LedgerEntry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.Optional;
import java.util.UUID;

public interface LedgerRepository extends JpaRepository<LedgerEntry, UUID> {
    @Query("SELECT l FROM LedgerEntry l ORDER BY l.timestamp DESC LIMIT 1")
    Optional<LedgerEntry> findLatestEntry();
}
