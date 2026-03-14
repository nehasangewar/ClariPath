package com.claripath.backend.controller;

import com.claripath.backend.entity.RoadmapSnapshot;
import com.claripath.backend.entity.User;
import com.claripath.backend.repository.RoadmapSnapshotRepository;
import com.claripath.backend.repository.UserRepository;
import com.claripath.backend.security.JwtService;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/roadmap")
@CrossOrigin(origins = "http://localhost:5173")
public class RoadmapController {

    private final RoadmapSnapshotRepository roadmapSnapshotRepository;
    private final UserRepository userRepository;
    private final JwtService jwtService;

    public RoadmapController(
            RoadmapSnapshotRepository roadmapSnapshotRepository,
            UserRepository userRepository,
            JwtService jwtService) {
        this.roadmapSnapshotRepository = roadmapSnapshotRepository;
        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }

   @GetMapping(value = "/current", produces = MediaType.APPLICATION_JSON_VALUE)
public ResponseEntity<?> getCurrentRoadmap(
        @RequestHeader("Authorization") String authHeader) {
    try {
        String token = authHeader.replace("Bearer ", "");
        String email = jwtService.extractUsername(token);

        Optional<User> userOpt = userRepository.findByEmail(email);
        if (userOpt.isEmpty()) {
            return ResponseEntity.status(404)
                .body(Map.of("success", false, "message", "User not found"));
        }

        Long userId = userOpt.get().getId();

        Optional<RoadmapSnapshot> snapshot =
            roadmapSnapshotRepository.findTopByUserIdOrderByGeneratedAtDesc(userId);

        if (snapshot.isEmpty()) {
            return ResponseEntity.status(404)
                .body(Map.of("success", false, "message", "No roadmap found"));
        }

        String roadmapJson = snapshot.get().getRoadmapJson();

        ObjectMapper mapper = new ObjectMapper();
        Object roadmapObject = mapper.readValue(roadmapJson, Object.class);

        return ResponseEntity.ok(roadmapObject);

    } catch (Exception e) {
        return ResponseEntity.status(500)
            .body(Map.of("success", false, "message", e.getMessage()));
    }
}
}
    