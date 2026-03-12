package com.claripath.backend.controller;

import com.claripath.backend.dto.AiGoalRequest;
import com.claripath.backend.dto.AiGoalResponse;
import com.claripath.backend.service.AiCareerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ai")
public class AiCareerController {

    @Autowired
    private AiCareerService aiCareerService;

    @PostMapping("/generate-goals")
    public AiGoalResponse generateGoals(@RequestBody AiGoalRequest request){

        return aiCareerService.generateGoals(request.getAnswers());
    }
}