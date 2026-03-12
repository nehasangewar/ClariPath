package com.claripath.backend.onboarding.dto;

import java.util.List;

public class GenerateRoadmapRequest {

    private Long userId;   // ✅ NEW FIELD (added safely)

    private String branch;
    private Integer semester;
    private String confirmedGoal;
    private String whatYouKnow;
    private List<String> assessmentAnswers;
    private Long collegeId;
    private Long branchId;
// + getters and setters

    // Getters

    public Long getUserId() { return userId; }   // ✅ NEW GETTER

    public String getBranch() { return branch; }

    public Integer getSemester() { return semester; }

    public String getConfirmedGoal() { return confirmedGoal; }

    public String getWhatYouKnow() { return whatYouKnow; }

    public List<String> getAssessmentAnswers() { return assessmentAnswers; }
    public Long getCollegeId() { return collegeId; }
    public Long getBranchId() { return branchId; }


    // Setters

    public void setUserId(Long userId) { this.userId = userId; }   // ✅ NEW SETTER

    public void setBranch(String branch) { this.branch = branch; }

    public void setSemester(Integer semester) { this.semester = semester; }

    public void setConfirmedGoal(String confirmedGoal) { this.confirmedGoal = confirmedGoal; }
    public void setCollegeId(Long collegeId) { this.collegeId = collegeId; }
    public void setBranchId(Long branchId) { this.branchId = branchId; }

    public void setWhatYouKnow(String whatYouKnow) { this.whatYouKnow = whatYouKnow; }

    public void setAssessmentAnswers(List<String> assessmentAnswers) { this.assessmentAnswers = assessmentAnswers; }
}