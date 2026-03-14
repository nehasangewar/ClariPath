package com.claripath.backend.controller;

import com.claripath.backend.entity.LearningPath;
import com.claripath.backend.repository.UserRepository;
import com.claripath.backend.security.JwtService;
import com.claripath.backend.service.LearningPathService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/learning-path")
@CrossOrigin(origins = "http://localhost:5173")
public class LearningPathController {

    private final LearningPathService learningPathService;
    private final JwtService jwtService;
    private final UserRepository userRepository;

    public LearningPathController(
            LearningPathService learningPathService,
            JwtService jwtService,
            UserRepository userRepository) {
        this.learningPathService = learningPathService;
        this.jwtService = jwtService;
        this.userRepository = userRepository;
    }

    // Keep old endpoint in case anything else uses it
    @GetMapping("/{userId}")
    public List<LearningPath> getUserLearningPath(@PathVariable Long userId) {
        return learningPathService.getUserLearningPath(userId);
    }

    // New JWT-secured endpoint for frontend dashboard
    @GetMapping("/mine")
    public List<LearningPath> getMyLearningPath(
            @RequestHeader("Authorization") String authHeader) {
        String email = jwtService.extractUsername(authHeader.replace("Bearer ", ""));
        Long userId = userRepository.findByEmail(email).get().getId();
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