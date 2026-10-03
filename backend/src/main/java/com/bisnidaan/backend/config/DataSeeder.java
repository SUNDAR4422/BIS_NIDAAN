package com.bisnidaan.backend.config;

import com.bisnidaan.backend.model.*;
import com.bisnidaan.backend.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.ZonedDateTime;
import java.util.UUID;

@Component
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {

    private final UserRepository userRepository;
    private final ProductRepository productRepository;
    private final BatchRepository batchRepository;
    private final ComplaintRepository complaintRepository;
    private final ReviewRepository reviewRepository;
    private final SafetyAlertRepository safetyAlertRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        if (userRepository.count() > 0) {
            return; // Already seeded
        }

        // 1. Users
        User admin = new User();
        admin.setId(UUID.randomUUID());
        admin.setEmail("admin@bis.gov.in");
        admin.setPasswordHash(passwordEncoder.encode("admin123"));
        admin.setRole("ADMIN");
        userRepository.save(admin);

        User manufacturer = new User();
        manufacturer.setId(UUID.randomUUID());
        manufacturer.setEmail("info@ambuja.com");
        manufacturer.setPasswordHash(passwordEncoder.encode("manuf123"));
        manufacturer.setRole("MANUFACTURER");
        userRepository.save(manufacturer);

        // 2. Products
        Product cement = new Product();
        cement.setId(UUID.randomUUID());
        cement.setManufacturerId(manufacturer.getId());
        cement.setName("ISI Marked Portland Cement - 53 Grade");
        cement.setIsStandardNumber("IS 269:2015");
        cement.setDescription("High strength portland cement for construction.");
        productRepository.save(cement);

        Product water = new Product();
        water.setId(UUID.randomUUID());
        water.setManufacturerId(manufacturer.getId()); // using same manuf for demo
        water.setName("Packaged Drinking Water - 1L");
        water.setIsStandardNumber("IS 14543:2016");
        water.setDescription("Treated water with added minerals.");
        productRepository.save(water);

        // 3. Batches
        Batch validBatch = new Batch();
        validBatch.setId(UUID.randomUUID());
        validBatch.setProductId(cement.getId());
        validBatch.setBatchNumber("BATCH-VALID-01");
        validBatch.setManufacturingDate(ZonedDateTime.now().minusDays(30));
        validBatch.setUnitCount(1000);
        validBatch.setStatus("VALID");
        validBatch.setMerkleRoot(UUID.randomUUID().toString());
        batchRepository.save(validBatch);

        Batch recallBatch = new Batch();
        recallBatch.setId(UUID.randomUUID());
        recallBatch.setProductId(water.getId());
        recallBatch.setBatchNumber("BATCH-RECALL-02");
        recallBatch.setManufacturingDate(ZonedDateTime.now().minusDays(15));
        recallBatch.setUnitCount(5000);
        recallBatch.setStatus("RECALLED");
        recallBatch.setMerkleRoot(UUID.randomUUID().toString());
        batchRepository.save(recallBatch);

        // 4. Complaints & Reviews
        Complaint c1 = new Complaint();
        c1.setId(UUID.randomUUID());
        c1.setProductId(water.getId());
        c1.setBatchId(recallBatch.getId());
        c1.setCategory("Health/Safety Hazard");
        c1.setDescription("Tasted like chemicals. Suspect heavy metal contamination.");
        c1.setStatus("INVESTIGATING");
        c1.setTrackingId("CMP-2024-3F2C");
        complaintRepository.save(c1);

        Review r1 = new Review();
        r1.setId(UUID.randomUUID());
        r1.setProductId(cement.getId());
        r1.setRating(5);
        r1.setComment("Excellent quality cement, verified on site using NIDAAN scanner.");
        reviewRepository.save(r1);

        Review r2 = new Review();
        r2.setId(UUID.randomUUID());
        r2.setProductId(water.getId());
        r2.setRating(1);
        r2.setComment("Do not buy this water. Unsafe levels of metals detected.");
        reviewRepository.save(r2);

        // 5. Safety Alerts
        SafetyAlert alert = new SafetyAlert();
        alert.setId(UUID.randomUUID());
        alert.setProductId(water.getId());
        alert.setAlertType("CRITICAL RECALL");
        alert.setMessage("Unsafe levels of heavy metals detected in this batch. Do not consume. Return to retailer immediately.");
        alert.setIsGlobal(false);
        alert.setAffectedBatches("BATCH-RECALL-02");
        alert.setIssuedAt(ZonedDateTime.now());
        safetyAlertRepository.save(alert);
        
        System.out.println("✅ Data Seeding Completed!");
    }
}
