package com.claripath.backend.controller;

import com.claripath.backend.entity.CareerGoal;
import com.claripath.backend.entity.OnboardingQuestion;
import com.claripath.backend.repository.CareerGoalRepository;
import com.claripath.backend.repository.OnboardingQuestionRepository;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api")
public class CareerGoalController {

    private final CareerGoalRepository careerGoalRepository;
    private final OnboardingQuestionRepository questionRepository;

    public CareerGoalController(CareerGoalRepository careerGoalRepository,
                                 OnboardingQuestionRepository questionRepository) {
        this.careerGoalRepository = careerGoalRepository;
        this.questionRepository = questionRepository;
    }

    @GetMapping("/career-goals")
    public List<CareerGoal> getGoals(@RequestParam String field) {
        return careerGoalRepository.findByField(field);
    }

    @GetMapping("/onboarding/questions")
    public List<OnboardingQuestion> getQuestions(@RequestParam String field) {
        return questionRepository.findByFieldAndQuestionTypeOrderByOrderNumberAsc(field, "DISCOVERY");
    }
}