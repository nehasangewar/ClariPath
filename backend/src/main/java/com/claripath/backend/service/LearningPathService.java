package com.claripath.backend.service;

import com.claripath.backend.entity.LearningPath;
import com.claripath.backend.repository.LearningPathRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LearningPathService {

    private final LearningPathRepository learningPathRepository;

    public LearningPathService(LearningPathRepository learningPathRepository) {
        this.learningPathRepository = learningPathRepository;
    }

    public List<LearningPath> getUserLearningPath(Long userId) {
        return learningPathRepository.findByUserIdOrderByOrderNo(userId);
    }

    public LearningPath markTaskCompleted(Long taskId) {

        LearningPath task = learningPathRepository.findById(taskId)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        task.setCompleted(true);

        return learningPathRepository.save(task);
    }

    public LearningPath markTaskIncomplete(Long taskId) {

        LearningPath task = learningPathRepository.findById(taskId)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        task.setCompleted(false);

        return learningPathRepository.save(task);
    }
}