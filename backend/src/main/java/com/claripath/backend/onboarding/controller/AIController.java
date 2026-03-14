package com.claripath.backend.onboarding.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import java.util.*;

@RestController
@RequestMapping("/api/ai")
@CrossOrigin(origins = "http://localhost:5173")
public class AIController {

    @Value("${gemini.api.key}")
    private String geminiApiKey;

    private final RestTemplate restTemplate = new RestTemplate();

    @PostMapping("/generate")
    public ResponseEntity<?> generate(
            @RequestBody Map<String, String> body,
            @RequestHeader("Authorization") String authHeader) {

        String systemPrompt = body.get("systemPrompt");
        String userMessage  = body.get("userMessage");

        String url = "https://generativelanguage.googleapis.com/v1beta/models/"
                   + "gemini-2.5-flash:generateContent?key=" + geminiApiKey;

        Map<String, Object> requestBody = Map.of(
            "contents", List.of(Map.of(
                "parts", List.of(Map.of("text", systemPrompt + "\n\n" + userMessage))
            ))
        );

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        try {
            ResponseEntity<Map> response = restTemplate.postForEntity(
                url, new HttpEntity<>(requestBody, headers), Map.class
            );
            return ResponseEntity.ok(response.getBody());
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of(
                "error", e.getMessage()
            ));
        }
    }
}