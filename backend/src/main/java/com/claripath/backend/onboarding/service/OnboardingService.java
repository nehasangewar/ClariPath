package com.claripath.backend.onboarding.service;

import com.claripath.backend.entity.LearningPath;
import com.claripath.backend.entity.RoadmapSnapshot;
import com.claripath.backend.repository.LearningPathRepository;
import com.claripath.backend.repository.RoadmapSnapshotRepository;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.transaction.annotation.Transactional;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Service
public class OnboardingService {

    private final LearningPathRepository learningPathRepository;
    private final RoadmapSnapshotRepository roadmapSnapshotRepository;

    @Value("${gemini.api.key}")
    private String geminiApiKey;

    public OnboardingService(
            LearningPathRepository learningPathRepository,
            RoadmapSnapshotRepository roadmapSnapshotRepository) {

        this.learningPathRepository = learningPathRepository;
        this.roadmapSnapshotRepository = roadmapSnapshotRepository;
    }

    @Transactional
    public String generateRoadmapFromAI(String prompt, Long userId) {

        try {

            // 1️⃣ Delete previous roadmap
            roadmapSnapshotRepository.deleteByUserId(userId);

            // 2️⃣ Call Gemini
            String aiResponse = callGemini(prompt);

            if (aiResponse == null) {
                throw new RuntimeException("Gemini returned null response");
            }

            ObjectMapper mapper = new ObjectMapper();
            JsonNode root = mapper.readTree(aiResponse);

            JsonNode candidates = root.path("candidates");

            if (candidates.isEmpty()) {
                throw new RuntimeException("Gemini returned no candidates");
            }

            // 3️⃣ Extract roadmap JSON
            String roadmapJson = candidates.get(0)
                    .path("content")
                    .path("parts").get(0)
                    .path("text")
                    .asText();

            roadmapJson = roadmapJson
                    .replace("```json", "")
                    .replace("```", "")
                    .trim();

            // 4️⃣ Validate JSON
            JsonNode roadmapNode = mapper.readTree(roadmapJson);

            // 5️⃣ Save roadmap snapshot
            RoadmapSnapshot snapshot = new RoadmapSnapshot();
            snapshot.setUserId(userId);
            snapshot.setSemester(1);
            snapshot.setRoadmapJson(roadmapJson);
            snapshot.setGeneratedAt(LocalDateTime.now());

            roadmapSnapshotRepository.save(snapshot);

            // 6️⃣ Extract tasks into learning_paths
            extractAndSaveModules(userId, roadmapNode);

            return roadmapJson;

        } catch (Exception e) {

            System.out.println("Gemini failed: " + e.getMessage());
            e.printStackTrace();

            return "Fallback roadmap created";
        }
    }

    private String callGemini(String prompt) {

        try {

            Thread.sleep(1500);

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

            System.out.println("Gemini API Error:");
            e.printStackTrace();

            return null;
        }
    }

    private void extractAndSaveModules(Long userId, JsonNode roadmapNode) {

        try {

            // Remove previous learning path
            learningPathRepository.deleteByUserId(userId);

            JsonNode phases = roadmapNode.path("phases");

            int order = 1;

            for (JsonNode phase : phases) {

                JsonNode weeks = phase.path("weeks");

                for (JsonNode week : weeks) {

                    JsonNode tasks = week.path("tasks");

                    for (JsonNode task : tasks) {

                        LearningPath module = new LearningPath();

                        module.setUserId(userId);
                        module.setModuleName(task.path("title").asText());
                        module.setDescription(task.path("description").asText());
                        module.setResourceUrl(task.path("resource_url").asText());
                        module.setDifficulty(task.path("difficulty").asText());
                        module.setEstimatedHours(task.path("estimated_hours").asInt());

                        module.setOrderNo(order++);
                        module.setCompleted(false);

                        learningPathRepository.save(module);
                    }
                }
            }

        } catch (Exception e) {

            System.out.println("Module extraction failed");
            e.printStackTrace();
        }
    }
}