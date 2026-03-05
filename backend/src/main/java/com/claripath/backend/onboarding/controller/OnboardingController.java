package com.claripath.backend.onboarding.controller;

import com.claripath.backend.onboarding.dto.GenerateRoadmapRequest;
import com.claripath.backend.onboarding.service.OnboardingService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/onboarding")
public class OnboardingController {

    private final OnboardingService onboardingService;

    public OnboardingController(OnboardingService onboardingService) {
        this.onboardingService = onboardingService;
    }

    @PostMapping("/generate-roadmap")
    public String generateRoadmap(@RequestBody GenerateRoadmapRequest request) {

        String prompt = """
        Student Branch: %s
        Semester: %s
        Goal: %s
        Current Knowledge: %s
        Answers: %s

        Determine student's skill level and generate a 16 week roadmap.
        """.formatted(
                request.getBranch(),
                request.getSemester(),
                request.getConfirmedGoal(),
                request.getWhatYouKnow(),
                request.getAssessmentAnswers()
        );

        return onboardingService.callGemini(prompt);
    }
}