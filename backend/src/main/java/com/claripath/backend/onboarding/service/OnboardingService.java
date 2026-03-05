package com.claripath.backend.onboarding.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.*;

@Service
public class OnboardingService {

    @Value("${gemini.api.key}")
    private String geminiApiKey;

    public String callGemini(String prompt) {

        String url =
                "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=" + geminiApiKey;


        RestTemplate restTemplate = new RestTemplate();

        // text part
        Map<String, Object> text = new HashMap<>();
        text.put("text", prompt);

        // parts array
        Map<String, Object> parts = new HashMap<>();
        parts.put("parts", List.of(text));

        // contents
        Map<String, Object> body = new HashMap<>();
        body.put("contents", List.of(parts));

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<Map<String, Object>> request =
                new HttpEntity<>(body, headers);

        ResponseEntity<String> response =
                restTemplate.postForEntity(url, request, String.class);

        return response.getBody();
    }
}