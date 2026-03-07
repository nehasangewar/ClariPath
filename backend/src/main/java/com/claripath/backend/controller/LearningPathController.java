package com.claripath.backend.controller;

import com.claripath.backend.entity.LearningPath;
import com.claripath.backend.repository.LearningPathRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/learning-path")
public class LearningPathController {

    private final LearningPathRepository learningPathRepository;

    public LearningPathController(LearningPathRepository learningPathRepository) {
        this.learningPathRepository = learningPathRepository;
    }

    @GetMapping("/{userId}")
    public List<LearningPath> getUserLearningPath(@PathVariable Long userId) {

        return learningPathRepository.findByUserIdOrderByOrderNo(userId);
    }
}