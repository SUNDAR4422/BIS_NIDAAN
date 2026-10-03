package com.bisnidaan.backend.controller;

import com.bisnidaan.backend.dto.DtoClasses.ChatRequest;
import com.bisnidaan.backend.dto.DtoClasses.ChatResponse;
import com.bisnidaan.backend.model.Product;
import com.bisnidaan.backend.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/public")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class ChatController {

    private final ProductRepository productRepository;

    @PostMapping("/chat")
    public ResponseEntity<ChatResponse> chatEndpoint(@RequestBody ChatRequest request) {
        String userMsg = request.getMessage() != null ? request.getMessage().toLowerCase() : "";
        String lang = request.getLanguage() != null ? request.getLanguage() : "en";
        
        String reply = "";

        // Simulated Intent Router & Standard Mapper
        if (userMsg.contains("isi") || userMsg.contains("certification process")) {
            if (lang.equals("hi")) {
                reply = "**ISI प्रमाणन प्रक्रिया:**\n1. मानक ऑनलाइन के माध्यम से आवेदन जमा करें।\n2. BIS अधिकारी कारखाने का निरीक्षण करते हैं।\n3. BIS-मान्यता प्राप्त प्रयोगशालाओं में नमूनों का परीक्षण किया जाता है।\n4. मानकों को पूरा करने पर लाइसेंस दिया जाता है।\n*स्रोत: BIS आधिकारिक दिशानिर्देश 2023.*";
            } else {
                reply = "**ISI Certification Process:**\n1. Submit application via Manak Online.\n2. BIS Officer conducts factory inspection.\n3. Samples are tested in BIS-recognized labs.\n4. License is granted if standards are met.\n*Source: BIS Official Guidelines 2023.*";
            }
        } else if (userMsg.contains("hallmark") || userMsg.contains("gold")) {
            if (lang.equals("hi")) {
                reply = "**हॉलमार्किंग जानकारी:** आभूषणों पर HUID (हॉलमार्क विशिष्ट पहचान) कोड अनिवार्य है। आप NIDAAN ऐप में HUID को सत्यापित कर सकते हैं।";
            } else {
                reply = "**Hallmarking Info:** HUID (Hallmark Unique Identification) code is mandatory on jewellery. You can verify the HUID in the NIDAAN app.";
            }
        } else if (userMsg.contains("complaint") || userMsg.contains("grievance")) {
            reply = lang.equals("hi") ? "आप 'Grievances' अनुभाग में जाकर सीधे शिकायत दर्ज कर सकते हैं। यदि आपके पास उत्पाद का QR/DataMatrix है, तो कृपया उसे स्कैन करें।" : "You can file a complaint directly by navigating to the 'Grievances' section. If you have the product's QR/DataMatrix, please scan it first.";
        } else {
            // Search product KB (Product Intelligence)
            List<Product> products = productRepository.findAll();
            boolean found = false;
            for (Product p : products) {
                if (userMsg.contains(p.getName().toLowerCase()) || userMsg.contains(p.getIsStandardNumber().toLowerCase())) {
                    if (lang.equals("hi")) {
                        reply = "**उत्पाद जानकारी प्राप्त हुई:**\nउत्पाद: " + p.getName() + "\nलागू मानक: **" + p.getIsStandardNumber() + "**\nविवरण: " + p.getDescription() + "\nसुरक्षा के लिए कृपया BIS-प्रमाणित मार्क (ISI) की जाँच करें।";
                    } else {
                        reply = "**Product Info Found:**\nProduct: " + p.getName() + "\nApplicable Standard: **" + p.getIsStandardNumber() + "**\nDescription: " + p.getDescription() + "\nPlease check for the BIS-certified mark (ISI) for safety.";
                    }
                    found = true;
                    break;
                }
            }

            if (!found) {
                reply = lang.equals("hi") ? "मुझे खेद है, मुझे आपके प्रश्न से संबंधित कोई विशिष्ट जानकारी नहीं मिली। कृपया BIS मानक या उत्पाद का नाम निर्दिष्ट करें।" : "I'm sorry, I couldn't find specific information related to your query. Please specify a BIS standard or product name.";
            }
        }

        return ResponseEntity.ok(new ChatResponse(reply));
    }
}
