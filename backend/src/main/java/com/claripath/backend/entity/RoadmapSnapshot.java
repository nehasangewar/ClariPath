package com.claripath.backend.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "roadmap_snapshots")
public class RoadmapSnapshot {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;

    private Integer semester;

    @Column(columnDefinition = "TEXT")
    private String roadmapJson;

    private LocalDateTime generatedAt;

    // GETTERS
    public Long getId() {
        return id;
    }

    public Long getUserId() {
        return userId;
    }

    public Integer getSemester() {
        return semester;
    }

    public String getRoadmapJson() {
        return roadmapJson;
    }

    public LocalDateTime getGeneratedAt() {
        return generatedAt;
    }

    // SETTERS
    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public void setSemester(Integer semester) {
        this.semester = semester;
    }

    public void setRoadmapJson(String roadmapJson) {
        this.roadmapJson = roadmapJson;
    }

    public void setGeneratedAt(LocalDateTime generatedAt) {
        this.generatedAt = generatedAt;
    }
}