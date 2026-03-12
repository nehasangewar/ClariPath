package com.claripath.backend.dto;

import java.util.List;

public class AiGoalResponse {

    private List<String> recommendedGoals;

    public List<String> getRecommendedGoals() {
        return recommendedGoals;
    }

    public void setRecommendedGoals(List<String> recommendedGoals) {
        this.recommendedGoals = recommendedGoals;
    }
}