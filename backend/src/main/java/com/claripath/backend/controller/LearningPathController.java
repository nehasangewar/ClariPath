package com.claripath.backend.controller;

import com.claripath.backend.entity.LearningPath;
import com.claripath.backend.service.LearningPathService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/learning-path")
public class LearningPathController {

    private final LearningPathService learningPathService;

    public LearningPathController(LearningPathService learningPathService) {
        this.learningPathService = learningPathService;
    }

    @GetMapping("/{userId}")
    public List<LearningPath> getUserLearningPath(@PathVariable Long userId) {
        return learningPathService.getUserLearningPath(userId);
    }

    @PutMapping("/complete/{taskId}")
    public LearningPath completeTask(@PathVariable Long taskId) {
        return learningPathService.markTaskCompleted(taskId);
    }

    @PutMapping("/incomplete/{taskId}")
    public LearningPath incompleteTask(@PathVariable Long taskId) {
        return learningPathService.markTaskIncomplete(taskId);
    }
}