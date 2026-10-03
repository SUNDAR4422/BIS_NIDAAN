package com.bisnidaan.backend.dto;

import lombok.Data;
import java.util.List;
import com.bisnidaan.backend.model.Product;
import com.bisnidaan.backend.model.Batch;

public class DtoClasses {

    @Data
    public static class LoginRequest {
        private String email;
        private String password;
    }

    @Data
    public static class LoginResponse {
        private String token;
        public LoginResponse(String token) { this.token = token; }
    }

    @Data
    public static class VerifyRequest {
        private String token;
    }

    @Data
    public static class VerifyResponse {
        private boolean authentic;
        private String status; // VALID, RECALLED, etc
        private int trustScore;
        private String batchNumber;
        private String productName;
        private String manufacturer;
        private String isStandard;
        private String mfgDate;
        private List<String> ingredients;
        private List<com.bisnidaan.backend.model.SafetyAlert> safety;
        private List<com.bisnidaan.backend.model.Review> reviews;
        private BlockchainProof blockchain;

        @Data
        public static class BlockchainProof {
            private String txId;
            private String hash;
            private String timestamp;
        }
    }

    @Data
    public static class ChatRequest {
        private String message;
        private String language;
    }

    @Data
    public static class ChatResponse {
        private String reply;
        public ChatResponse(String reply) { this.reply = reply; }
    }
    
    @Data
    public static class ProductListResponse {
        private List<Product> products;
        public ProductListResponse(List<Product> products) { this.products = products; }
    }

    @Data
    public static class BatchListResponse {
        private List<Batch> batches;
        public BatchListResponse(List<Batch> batches) { this.batches = batches; }
    }

    @Data
    public static class ComplaintRequest {
        private String batchNumber;
        private String category;
        private String description;
    }

    @Data
    public static class ComplaintResponse {
        private String id;
        private String status;
        public ComplaintResponse(String id, String status) { this.id = id; this.status = status; }
    }

    @Data
    public static class RecallRequest {
        private String batchNumber;
        private String reason;
    }

    @Data
    public static class GenerateBatchRequest {
        private String productId;
    }
}
