package com.bisnidaan.backend.controller;

import com.bisnidaan.backend.config.JwtUtil;
import com.bisnidaan.backend.dto.DtoClasses;
import com.bisnidaan.backend.dto.DtoClasses.LoginRequest;
import com.bisnidaan.backend.dto.DtoClasses.LoginResponse;
import com.bisnidaan.backend.dto.DtoClasses.ProductListResponse;
import com.bisnidaan.backend.dto.DtoClasses.BatchListResponse;
import com.bisnidaan.backend.model.Batch;
import com.bisnidaan.backend.model.Product;
import com.bisnidaan.backend.model.User;
import com.bisnidaan.backend.repository.BatchRepository;
import com.bisnidaan.backend.repository.ProductRepository;
import com.bisnidaan.backend.repository.UserRepository;
import com.bisnidaan.backend.repository.ComplaintRepository;
import com.bisnidaan.backend.repository.SafetyAlertRepository;
import com.bisnidaan.backend.service.LedgerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.time.ZonedDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class AdminController {

    private final UserRepository userRepository;
    private final ComplaintRepository complaintRepository;
    private final SafetyAlertRepository safetyAlertRepository;
    private final ProductRepository productRepository;
    private final BatchRepository batchRepository;
    private final LedgerService ledgerService;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        Optional<User> userOpt = userRepository.findByEmail(request.getEmail());
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            if (passwordEncoder.matches(request.getPassword(), user.getPasswordHash())) {
                String token = jwtUtil.generateToken(user.getEmail(), user.getRole(), user.getId().toString());
                return ResponseEntity.ok(new LoginResponse(token));
            }
        }
        return ResponseEntity.status(401).body("Invalid email or password");
    }

    @GetMapping("/products")
    public ResponseEntity<ProductListResponse> getProducts() {
        return ResponseEntity.ok(new ProductListResponse(productRepository.findAll()));
    }

    @PostMapping("/products")
    public ResponseEntity<Product> createProduct(@RequestBody Product product) {
        product.setId(UUID.randomUUID());
        product.setCreatedAt(ZonedDateTime.now());
        product.setUpdatedAt(ZonedDateTime.now());
        return ResponseEntity.ok(productRepository.save(product));
    }

    @GetMapping("/batches")
    public ResponseEntity<DtoClasses.BatchListResponse> getAllBatches() {
        return ResponseEntity.ok(new DtoClasses.BatchListResponse(batchRepository.findAll()));
    }

    @PostMapping("/batches")
    public ResponseEntity<?> generateBatch(@RequestBody DtoClasses.GenerateBatchRequest request) {
        Optional<Product> prodOpt = productRepository.findById(UUID.fromString(request.getProductId()));
        if (prodOpt.isEmpty()) return ResponseEntity.badRequest().body("Product not found");

        Batch batch = new Batch();
        batch.setProductId(prodOpt.get().getId());
        batch.setBatchNumber("BAT-" + System.currentTimeMillis());
        batch.setManufacturingDate(ZonedDateTime.now());
        batch.setStatus("VALID");
        String mockMerkleRoot = UUID.randomUUID().toString().replace("-", "");
        batch.setMerkleRoot(mockMerkleRoot);
        batchRepository.save(batch);

        ledgerService.appendEntry(mockMerkleRoot, null);

        return ResponseEntity.ok().build();
    }

    @GetMapping("/complaints")
    public ResponseEntity<List<com.bisnidaan.backend.model.Complaint>> getAllComplaints() {
        return ResponseEntity.ok(complaintRepository.findAll());
    }

    @GetMapping("/recalls")
    public ResponseEntity<List<com.bisnidaan.backend.model.SafetyAlert>> getAllRecalls() {
        return ResponseEntity.ok(safetyAlertRepository.findAll());
    }

    @PostMapping("/recalls")
    public ResponseEntity<?> issueRecall(@RequestBody DtoClasses.RecallRequest request) {
        com.bisnidaan.backend.model.SafetyAlert alert = new com.bisnidaan.backend.model.SafetyAlert();
        alert.setAlertType("CRITICAL");
        alert.setMessage(request.getReason());
        
        batchRepository.findByBatchNumber(request.getBatchNumber()).ifPresent(b -> alert.setAffectedBatches(b.getBatchNumber()));
        
        safetyAlertRepository.save(alert);
        return ResponseEntity.ok().build();
    }
}
