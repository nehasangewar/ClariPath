package com.claripath.backend.onboarding.service;

import com.claripath.backend.entity.LearningPath;
import com.claripath.backend.entity.RoadmapSnapshot;
import com.claripath.backend.entity.User;
import com.claripath.backend.repository.LearningPathRepository;
import com.claripath.backend.repository.RoadmapSnapshotRepository;
import com.claripath.backend.repository.UserRepository;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class OnboardingService {

    private final LearningPathRepository learningPathRepository;
    private final RoadmapSnapshotRepository roadmapSnapshotRepository;
    private final UserRepository userRepository;

    public OnboardingService(
            LearningPathRepository learningPathRepository,
            RoadmapSnapshotRepository roadmapSnapshotRepository,
            UserRepository userRepository) {
        this.learningPathRepository = learningPathRepository;
        this.roadmapSnapshotRepository = roadmapSnapshotRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public String saveRoadmap(String roadmapJson, Long userId, String branch, Integer semester, String college) {
        try {
            roadmapSnapshotRepository.deleteByUserId(userId);

            ObjectMapper mapper = new ObjectMapper();
            JsonNode roadmapNode = mapper.readTree(roadmapJson);

            RoadmapSnapshot snapshot = new RoadmapSnapshot();
            snapshot.setUserId(userId);
            snapshot.setSemester(semester != null ? semester : 1);
            snapshot.setRoadmapJson(roadmapJson);
            snapshot.setGeneratedAt(LocalDateTime.now());
            roadmapSnapshotRepository.save(snapshot);

            // ── Update user profile from roadmap + onboarding data ──
            Optional<User> userOpt = userRepository.findById(userId);
            userOpt.ifPresent(user -> {
                // From onboarding form
                if (branch != null)   user.setBranch(branch);
                if (semester != null) user.setSemester(semester);
                if (college != null)  user.setCollege(college);

                // From roadmap AI response
                JsonNode summary = roadmapNode.path("studentSummary");
                if (!summary.isMissingNode()) {
                    String trueLevel = summary.path("trueLevel").asText(null);
                    String startPoint = summary.path("startPoint").asText(null);
                    if (trueLevel != null && !trueLevel.isEmpty())   user.setTrueLevel(trueLevel);
                    if (startPoint != null && !startPoint.isEmpty()) user.setStartPoint(startPoint);

                    JsonNode skipped = summary.path("topicsSkipped");
                    if (skipped.isArray()) {
                        StringBuilder sb = new StringBuilder();
                        for (JsonNode t : skipped) {
                            if (sb.length() > 0) sb.append(",");
                            sb.append(t.asText());
                        }
                        user.setSkippedTopics(sb.toString());
                    }
                }
                userRepository.save(user);
            });

            extractAndSaveModules(userId, roadmapNode);

            return roadmapJson;

        } catch (Exception e) {
            System.out.println("Save failed: " + e.getMessage());
            e.printStackTrace();
            throw new RuntimeException("Failed to save roadmap: " + e.getMessage());
        }
    }

    private void extractAndSaveModules(Long userId, JsonNode roadmapNode) {
        try {
            learningPathRepository.deleteByUserId(userId);

            JsonNode phases = roadmapNode.path("phases");
            int order = 1;

            for (JsonNode phase : phases) {
                JsonNode weeksData = phase.path("weeks_data");
                for (JsonNode week : weeksData) {
                    JsonNode tasks = week.path("tasks");
                    for (JsonNode task : tasks) {
                        LearningPath module = new LearningPath();
                        module.setUserId(userId);
                        module.setModuleName(task.path("title").asText());
                        module.setDescription(task.path("desc").asText());
                        module.setResourceUrl(task.path("resourceUrl").asText());
                        module.setResource(task.path("resource").asText());
                        module.setDifficulty(task.path("difficulty").asText());
                        module.setEstimatedHours(task.path("hours").asInt());
                        module.setOrderNo(order++);
                        module.setCompleted(false);

                        // tags is an array — join to comma string
                        JsonNode tagsNode = task.path("tags");
                        if (tagsNode.isArray()) {
                            StringBuilder sb = new StringBuilder();
                            for (JsonNode tag : tagsNode) {
                                if (sb.length() > 0) sb.append(",");
                                sb.append(tag.asText());
                            }
                            module.setTags(sb.toString());
                        }

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