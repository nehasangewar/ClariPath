package com.claripath.backend.service;

import com.claripath.backend.dto.ProgressResponse;
import com.claripath.backend.repository.LearningPathRepository;
import org.springframework.stereotype.Service;

@Service
public class ProgressService {

    private final LearningPathRepository learningPathRepository;

    public ProgressService(LearningPathRepository learningPathRepository) {
        this.learningPathRepository = learningPathRepository;
    }

    public ProgressResponse getProgress(Long userId) {

        int totalTasks = (int) learningPathRepository.countByUserId(userId);
        int completedTasks = (int) learningPathRepository.countByUserIdAndCompletedTrue(userId);

        return new ProgressResponse(totalTasks, completedTasks);
    }
}