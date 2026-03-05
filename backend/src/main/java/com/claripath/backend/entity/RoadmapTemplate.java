package com.claripath.backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "roadmap_templates")
public class RoadmapTemplate {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "career_goal")
    private String careerGoal;

    private String level;

    @Column(name = "module_name")
    private String moduleName;

    @Column(name = "order_no")
    private Integer orderNo;

    public Long getId() {
        return id;
    }

    public String getCareerGoal() {
        return careerGoal;
    }

    public String getLevel() {
        return level;
    }

    public String getModuleName() {
        return moduleName;
    }

    public Integer getOrderNo() {
        return orderNo;
    }
}