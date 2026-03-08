package com.claripath.backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "learning_paths")
public class LearningPath {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id")
    private Long userId;

    @Column(name = "module_name")
    private String moduleName;

    private String description;

    @Column(name = "resource_url")
    private String resourceUrl;

    private String difficulty;

    @Column(name = "estimated_hours")
    private Integer estimatedHours;

    @Column(name = "order_no")
    private Integer orderNo;

    private Boolean completed = false;

    // Getters
    public Long getId() { return id; }
    public Long getUserId() { return userId; }
    public String getModuleName() { return moduleName; }
    public String getDescription() { return description; }
    public String getResourceUrl() { return resourceUrl; }
    public String getDifficulty() { return difficulty; }
    public Integer getEstimatedHours() { return estimatedHours; }
    public Integer getOrderNo() { return orderNo; }
    public Boolean getCompleted() { return completed; }

    // Setters
    public void setUserId(Long userId) { this.userId = userId; }
    public void setModuleName(String moduleName) { this.moduleName = moduleName; }
    public void setDescription(String description) { this.description = description; }
    public void setResourceUrl(String resourceUrl) { this.resourceUrl = resourceUrl; }
    public void setDifficulty(String difficulty) { this.difficulty = difficulty; }
    public void setEstimatedHours(Integer estimatedHours) { this.estimatedHours = estimatedHours; }
    public void setOrderNo(Integer orderNo) { this.orderNo = orderNo; }
    public void setCompleted(Boolean completed) { this.completed = completed; }
}