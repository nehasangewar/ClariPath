package com.claripath.backend.dto;

public class ProgressResponse {

    private int totalTasks;
    private int completedTasks;
    private int remainingTasks;
    private int progressPercentage;

    public ProgressResponse(int totalTasks, int completedTasks) {
        this.totalTasks = totalTasks;
        this.completedTasks = completedTasks;
        this.remainingTasks = totalTasks - completedTasks;

        if (totalTasks == 0) {
            this.progressPercentage = 0;
        } else {
            this.progressPercentage = (completedTasks * 100) / totalTasks;
        }
    }

    public int getTotalTasks() {
        return totalTasks;
    }

    public int getCompletedTasks() {
        return completedTasks;
    }

    public int getRemainingTasks() {
        return remainingTasks;
    }

    public int getProgressPercentage() {
        return progressPercentage;
    }
}