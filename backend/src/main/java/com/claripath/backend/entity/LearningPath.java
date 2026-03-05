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

    @Column(name = "order_no")
    private Integer orderNo;

    private Boolean completed = false;

    // Getters and Setters

    public Long getId() {
        return id;
    }

    public Long getUserId() {
        return userId;
    }

    public String getModuleName() {
        return moduleName;
    }

    public Integer getOrderNo() {
        return orderNo;
    }

    public Boolean getCompleted() {
        return completed;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public void setModuleName(String moduleName) {
        this.moduleName = moduleName;
    }

    public void setOrderNo(Integer orderNo) {
        this.orderNo = orderNo;
    }

    public void setCompleted(Boolean completed) {
        this.completed = completed;
    }
}