package com.claripath.backend.onboarding.dto;

import java.util.List;

public class GenerateRoadmapRequest {

    private String branch;
    private Integer semester;
    private String confirmedGoal;
    private String whatYouKnow;
    private List<String> assessmentAnswers;

    public String getBranch() {
        return branch;
    }

    public Integer getSemester() {
        return semester;
    }

    public String getConfirmedGoal() {
        return confirmedGoal;
    }

    public String getWhatYouKnow() {
        return whatYouKnow;
    }

    public List<String> getAssessmentAnswers() {
        return assessmentAnswers;
    }
}