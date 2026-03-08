package com.claripath.backend.controller;

import com.claripath.backend.dto.ProgressResponse;
import com.claripath.backend.service.ProgressService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/progress")
public class ProgressController {

    private final ProgressService progressService;

    public ProgressController(ProgressService progressService) {
        this.progressService = progressService;
    }

    @GetMapping("/{userId}")
    public ProgressResponse getUserProgress(@PathVariable Long userId) {

        return progressService.getProgress(userId);
    }
}