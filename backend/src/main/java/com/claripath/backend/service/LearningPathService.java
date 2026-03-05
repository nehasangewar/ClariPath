package com.claripath.backend.service;

import com.claripath.backend.entity.LearningPath;
import com.claripath.backend.entity.RoadmapTemplate;
import com.claripath.backend.entity.StudentProfile;
import com.claripath.backend.repository.LearningPathRepository;
import com.claripath.backend.repository.RoadmapTemplateRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LearningPathService {

    private final LearningPathRepository learningPathRepository;
    private final RoadmapTemplateRepository roadmapTemplateRepository;

    public LearningPathService(LearningPathRepository learningPathRepository,
                               RoadmapTemplateRepository roadmapTemplateRepository) {
        this.learningPathRepository = learningPathRepository;
        this.roadmapTemplateRepository = roadmapTemplateRepository;
    }

    public void generatePath(StudentProfile profile) {

        Long userId = profile.getUser().getId();

        // Fetch roadmap template
        List<RoadmapTemplate> templates =
                roadmapTemplateRepository
                        .findByCareerGoalIgnoreCaseAndLevelIgnoreCaseOrderByOrderNoAsc(
                                profile.getCareerGoal(),
                                profile.getCurrentLevel()
                        );

        // Copy template modules into learning_paths
        for (RoadmapTemplate template : templates) {

            LearningPath path = new LearningPath();
            path.setUserId(userId);
            path.setModuleName(template.getModuleName());
            path.setOrderNo(template.getOrderNo());
            path.setCompleted(false);

            learningPathRepository.save(path);
        }
    }
}