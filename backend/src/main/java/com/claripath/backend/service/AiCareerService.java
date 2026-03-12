package com.claripath.backend.service;

import com.claripath.backend.dto.AiGoalResponse;
import com.claripath.backend.entity.AiPrompt;
import com.claripath.backend.repository.AiPromptRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AiCareerService {

    @Autowired
    private AiPromptRepository promptRepository;

    public AiGoalResponse generateGoals(String answers){

        // Fetch prompt from DB
        List<AiPrompt> prompts = promptRepository.findAll();
        AiPrompt prompt = prompts.get(0);

        String fullPrompt =
                prompt.getPromptText() + "\nStudent Answers:\n" + answers;

        System.out.println("AI PROMPT SENT:");
        System.out.println(fullPrompt);

        // Simulated AI result
        AiGoalResponse response = new AiGoalResponse();

        response.setRecommendedGoals(List.of(
                "Embedded Systems Engineer",
                "Robotics Engineer",
                "Hardware Design Engineer"
        ));

        return response;
    }
}