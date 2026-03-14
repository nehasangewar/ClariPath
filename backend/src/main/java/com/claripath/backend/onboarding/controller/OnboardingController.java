package com.claripath.backend.onboarding.controller;

import com.claripath.backend.onboarding.dto.GenerateRoadmapRequest;
import com.claripath.backend.onboarding.service.OnboardingService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/onboarding")
@CrossOrigin(origins = "http://localhost:5173")
public class OnboardingController {

    private final OnboardingService onboardingService;

    public OnboardingController(OnboardingService onboardingService) {
        this.onboardingService = onboardingService;
    }

    @PostMapping("/generate-roadmap")
    public ResponseEntity<?> generateRoadmap(@RequestBody GenerateRoadmapRequest request) {
        try {
            String saved = onboardingService.saveRoadmap(
                request.getRoadmapJson(),
                request.getUserId(),
                request.getBranch(),
                request.getSemester(),
                request.getCollege()
            );
            return ResponseEntity.ok(Map.of("success", true, "roadmapJson", saved));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("success", false, "message", e.getMessage()));
        }
    }
}