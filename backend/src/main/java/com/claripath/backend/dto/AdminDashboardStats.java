package com.claripath.backend.dto;

public class AdminDashboardStats {

    private long totalStudents;
    private long totalUniversities;
    private long totalCareerGoals;
    private long totalPrompts;

    public long getTotalStudents() {
        return totalStudents;
    }

    public void setTotalStudents(long totalStudents) {
        this.totalStudents = totalStudents;
    }

    public long getTotalUniversities() {
        return totalUniversities;
    }

    public void setTotalUniversities(long totalUniversities) {
        this.totalUniversities = totalUniversities;
    }

    public long getTotalCareerGoals() {
        return totalCareerGoals;
    }

    public void setTotalCareerGoals(long totalCareerGoals) {
        this.totalCareerGoals = totalCareerGoals;
    }

    public long getTotalPrompts() {
        return totalPrompts;
    }

    public void setTotalPrompts(long totalPrompts) {
        this.totalPrompts = totalPrompts;
    }
}