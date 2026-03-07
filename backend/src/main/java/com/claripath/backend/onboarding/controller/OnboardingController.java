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
    public String generateRoadmap(@RequestBody GenerateRoadmapRequest request) throws Exception {

        // ✅ No JSON examples in the prompt — plain text only
        String prompt = "You are an expert computer science educator. " +
                "A student has provided the following details: " +
                "Branch: " + request.getBranch() + ". " +
                "Semester: " + request.getSemester() + ". " +
                "Career Goal: " + request.getConfirmedGoal() + ". " +
                "Current Knowledge: " + request.getWhatYouKnow() + ". " +
                "Assessment Answers: " + request.getAssessmentAnswers() + ". " +
                "Generate a 16-week personalized learning roadmap divided into 4 phases. " +
                "Return ONLY raw JSON with no markdown, no explanation, no code fences. " +
                "The JSON must follow this exact structure: " +
                "{\"phases\": [{\"phase_number\": 1, \"phase_goal\": \"string\", \"weeks\": [{\"week_number\": 1, \"weekly_focus\": \"string\", \"tasks\": [{\"id\": \"t1\", \"title\": \"string\", \"description\": \"string\", \"resource_name\": \"string\", \"resource_url\": \"string\", \"estimated_hours\": 3, \"difficulty\": \"EASY\"}]}]}]}. " +
                "Return exactly 4 phases, 4 weeks per phase, 3 tasks per week. Difficulty must be EASY, MEDIUM, or HARD only.";

        return onboardingService.generateRoadmapFromAI(prompt, request.getUserId());
    }
}