package com.claripath.backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "student_profiles")
public class StudentProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // One profile belongs to one user
    @OneToOne
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;

    @Column(name = "full_name")
    private String fullName;

    @Column(name = "career_goal")
    private String careerGoal;

    @Column(name = "current_level")
    private String currentLevel;

    @Column(name = "true_level")
    private String trueLevel;

    @Column(name = "skip_topics", columnDefinition = "TEXT")
    private String skipTopics;

    @Column(name = "start_point")
    private String startPoint;

    @Column(name = "status")
    private String status;

    // ==========================
    // Getters & Setters
    // ==========================

    public Long getId() {
        return id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getCareerGoal() {
        return careerGoal;
    }

    public void setCareerGoal(String careerGoal) {
        this.careerGoal = careerGoal;
    }

    public String getCurrentLevel() {
        return currentLevel;
    }

    public void setCurrentLevel(String currentLevel) {
        this.currentLevel = currentLevel;
    }

    public String getTrueLevel() {
        return trueLevel;
    }

    public void setTrueLevel(String trueLevel) {
        this.trueLevel = trueLevel;
    }

    public String getSkipTopics() {
        return skipTopics;
    }

    public void setSkipTopics(String skipTopics) {
        this.skipTopics = skipTopics;
    }

    public String getStartPoint() {
        return startPoint;
    }

    public void setStartPoint(String startPoint) {
        this.startPoint = startPoint;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}