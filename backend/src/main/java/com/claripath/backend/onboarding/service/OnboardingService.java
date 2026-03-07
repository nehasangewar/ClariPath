package com.claripath.backend.onboarding.service;

import com.claripath.backend.entity.LearningPath;
import com.claripath.backend.repository.LearningPathRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import com.claripath.backend.entity.RoadmapSnapshot;
import com.claripath.backend.repository.RoadmapSnapshotRepository;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.time.LocalDateTime;

import java.util.List;
import java.util.Map;

@Service
public class OnboardingService {

    private final LearningPathRepository learningPathRepository;
    private final RoadmapSnapshotRepository roadmapSnapshotRepository;

    @Value("${gemini.api.key}")
    private String geminiApiKey;

    public OnboardingService(LearningPathRepository learningPathRepository,
                             RoadmapSnapshotRepository roadmapSnapshotRepository) {
        this.learningPathRepository = learningPathRepository;
        this.roadmapSnapshotRepository = roadmapSnapshotRepository;
    }

    public String generateRoadmapFromAI(String prompt, Long userId) {
        try {
            String aiResponse = callGemini(prompt);

            ObjectMapper mapper = new ObjectMapper();
            JsonNode root = mapper.readTree(aiResponse);
            String roadmapJson = root.path("candidates").get(0)
                    .path("content").path("parts").get(0)
                    .path("text").asText();
            roadmapJson = roadmapJson.replace("```json", "").replace("```", "").trim();

            RoadmapSnapshot snapshot = new RoadmapSnapshot();
            snapshot.setUserId(userId);
            snapshot.setSemester(1);
            snapshot.setRoadmapJson(roadmapJson);
            snapshot.setGeneratedAt(LocalDateTime.now());
            roadmapSnapshotRepository.save(snapshot);

            return roadmapJson;
        } catch (Exception e) {
            System.out.println("Gemini failed: " + e.getMessage());
            return "Fallback roadmap created";
        }
    }

    private String callGemini(String prompt) {

        try {

            Thread.sleep(1500); // prevent rapid requests

            String url =
                    "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key="
                            + geminiApiKey;

            RestTemplate restTemplate = new RestTemplate();

            Map<String, Object> text = Map.of("text", prompt);
            Map<String, Object> part = Map.of("parts", List.of(text));
            Map<String, Object> body = Map.of("contents", List.of(part));

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            HttpEntity<Map<String, Object>> request =
                    new HttpEntity<>(body, headers);

            ResponseEntity<String> response =
                    restTemplate.postForEntity(url, request, String.class);

            return response.getBody();

        } catch (Exception e) {

            System.out.println("Gemini Error:");
            e.printStackTrace();

            return null;
        }
    }

    private void saveModules(Long userId, List<String> modules) {

        int order = 1;

        for (String module : modules) {

            LearningPath learningPath = new LearningPath();
            learningPath.setUserId(userId);
            learningPath.setModuleName(module);
            learningPath.setOrderNo(order++);
            learningPath.setCompleted(false);

            learningPathRepository.save(learningPath);
        }
    }
}