package com.bisnidaan.backend.controller;

import com.bisnidaan.backend.dto.DtoClasses;
import com.bisnidaan.backend.model.Batch;
import com.bisnidaan.backend.model.Complaint;
import com.bisnidaan.backend.repository.BatchRepository;
import com.bisnidaan.backend.repository.ComplaintRepository;
import com.bisnidaan.backend.repository.ReviewRepository;
import com.bisnidaan.backend.repository.SafetyAlertRepository;
import com.bisnidaan.backend.repository.ProductRepository;
import com.bisnidaan.backend.repository.TestingLabRepository;
import com.bisnidaan.backend.model.Product;
import com.bisnidaan.backend.model.TestingLab;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/public")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class PublicController {

    private final BatchRepository batchRepository;
    private final ComplaintRepository complaintRepository;
    private final ReviewRepository reviewRepository;
    private final SafetyAlertRepository safetyAlertRepository;
    private final ProductRepository productRepository;
    private final TestingLabRepository testingLabRepository;

    @GetMapping("/verify/{batchId}")
    public ResponseEntity<DtoClasses.VerifyResponse> verifyBatch(@PathVariable String batchId) {
        Optional<Batch> batchOpt = batchRepository.findByBatchNumber(batchId);
        
        if (batchOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        
        Batch batch = batchOpt.get();
        DtoClasses.VerifyResponse response = new DtoClasses.VerifyResponse();
        
        Optional<Product> prodOpt = productRepository.findById(batch.getProductId());
        
        response.setAuthentic(true);
        response.setBatchNumber(batch.getBatchNumber());
        if (prodOpt.isPresent()) {
            response.setProductName(prodOpt.get().getName());
            // Safe handling if manufacturer is missing
            response.setManufacturer("Generic Manufacturer"); 
            response.setIsStandard(prodOpt.get().getIsStandardNumber());
        }
        
        // Mock data logic using actual DB objects where possible
        response.setTrustScore(batch.getStatus() != null && batch.getStatus().equals("VALID") ? 98 : 12);
        response.setStatus(batch.getStatus());
        response.setMfgDate(batch.getManufacturingDate() != null ? batch.getManufacturingDate().toString() : "2024-01-01");
        response.setIngredients(List.of("Ingredient A", "Ingredient B")); // Mock ingredients
        
        // Fetch relations
        response.setReviews(reviewRepository.findByProductId(batch.getProductId()));
        response.setSafety(safetyAlertRepository.findByProductId(batch.getProductId()));
        
        DtoClasses.VerifyResponse.BlockchainProof proof = new DtoClasses.VerifyResponse.BlockchainProof();
        proof.setTxId("0x" + UUID.randomUUID().toString().substring(0, 10));
        proof.setHash("sha256:abcd1234...");
        proof.setTimestamp(java.time.Instant.now().toString());
        response.setBlockchain(proof);

        return ResponseEntity.ok(response);
    }

    @PostMapping("/complaints")
    public ResponseEntity<DtoClasses.ComplaintResponse> submitComplaint(@RequestBody DtoClasses.ComplaintRequest request) {
        Complaint complaint = new Complaint();
        complaint.setCategory(request.getCategory());
        complaint.setDescription(request.getDescription());
        complaint.setStatus("OPEN");
        
        // Find batch if provided
        if (request.getBatchNumber() != null && !request.getBatchNumber().isEmpty()) {
            batchRepository.findByBatchNumber(request.getBatchNumber()).ifPresent(b -> complaint.setBatchId(b.getId()));
        }

        Complaint saved = complaintRepository.save(complaint);
        return ResponseEntity.ok(new DtoClasses.ComplaintResponse(saved.getId().toString(), saved.getStatus()));
    }

    @GetMapping("/labs")
    public ResponseEntity<List<TestingLab>> getLabs() {
        return ResponseEntity.ok(testingLabRepository.findAll());
    }
}
