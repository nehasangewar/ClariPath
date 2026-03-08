package com.claripath.backend.dto;

public class DashboardResponse {

    private int totalTasks;
    private int completedTasks;
    private int remainingTasks;
    private int progressPercentage;

    private String currentModule;
    private String nextModule;

    public DashboardResponse(
            int totalTasks,
            int completedTasks,
            String currentModule,
            String nextModule) {

        this.totalTasks = totalTasks;
        this.completedTasks = completedTasks;
        this.remainingTasks = totalTasks - completedTasks;

        if(totalTasks == 0){
            this.progressPercentage = 0;
        } else {
            this.progressPercentage = (completedTasks * 100) / totalTasks;
        }

        this.currentModule = currentModule;
        this.nextModule = nextModule;
    }

    public int getTotalTasks() { return totalTasks; }
    public int getCompletedTasks() { return completedTasks; }
    public int getRemainingTasks() { return remainingTasks; }
    public int getProgressPercentage() { return progressPercentage; }

    public String getCurrentModule() { return currentModule; }
    public String getNextModule() { return nextModule; }
}