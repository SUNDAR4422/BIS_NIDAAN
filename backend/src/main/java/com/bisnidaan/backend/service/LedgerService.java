package com.bisnidaan.backend.service;

import com.bisnidaan.backend.model.LedgerEntry;
import com.bisnidaan.backend.repository.LedgerRepository;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.time.ZonedDateTime;
import java.util.Optional;
import java.util.UUID;

@Service
public class LedgerService {

    private final LedgerRepository ledgerRepository;

    public LedgerService(LedgerRepository ledgerRepository) {
        this.ledgerRepository = ledgerRepository;
    }

    public LedgerEntry appendEntry(String payloadHash, String signature) {
        Optional<LedgerEntry> latestEntryOpt = ledgerRepository.findLatestEntry();
        String previousHash = latestEntryOpt.map(LedgerEntry::getEntryHash)
                .orElse("0000000000000000000000000000000000000000000000000000000000000000"); // Genesis

        ZonedDateTime timestamp = ZonedDateTime.now();
        
        String entryHash = calculateHash(previousHash, payloadHash, timestamp);

        LedgerEntry newEntry = new LedgerEntry();
        newEntry.setId(UUID.randomUUID());
        newEntry.setPreviousHash(previousHash);
        newEntry.setPayloadHash(payloadHash);
        newEntry.setTimestamp(timestamp);
        newEntry.setSignature(signature);
        newEntry.setEntryHash(entryHash);

        return ledgerRepository.save(newEntry);
    }

    private String calculateHash(String previousHash, String payloadHash, ZonedDateTime timestamp) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            digest.update(previousHash.getBytes(StandardCharsets.UTF_8));
            digest.update(payloadHash.getBytes(StandardCharsets.UTF_8));
            digest.update(String.valueOf(timestamp.toInstant().toEpochMilli()).getBytes(StandardCharsets.UTF_8));
            byte[] hashBytes = digest.digest();
            StringBuilder sb = new StringBuilder();
            for (byte b : hashBytes) {
                sb.append(String.format("%02x", b));
            }
            return sb.toString();
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException("SHA-256 algorithm not found", e);
        }
    }
}
