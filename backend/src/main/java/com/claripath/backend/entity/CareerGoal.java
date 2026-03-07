package com.claripath.backend.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "career_goals")
@Data
public class CareerGoal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String field;
    private String domain;
    private String description;

    // Original detail fields
    @Column(name = "what_you_learn", columnDefinition = "TEXT")
    private String whatYouLearn;

    @Column(name = "what_you_do", columnDefinition = "TEXT")
    private String whatYouDo;

    @Column(name = "salary_range")
    private String salaryRange;

    @Column(name = "top_companies", columnDefinition = "TEXT")
    private String topCompanies;

    // New detail fields
    @Column(name = "field_overview", columnDefinition = "TEXT")
    private String fieldOverview;

    @Column(name = "primary_roles")
    private String primaryRoles;

    @Column(name = "core_skills")
    private String coreSkills;

    @Column(name = "tools")
    private String tools;

    @Column(name = "academic_relevance")
    private String academicRelevance;

    @Column(name = "career_scope", columnDefinition = "TEXT")
    private String careerScope;

    @Column(name = "entry_level_role")
    private String entryLevelRole;

    @Column(name = "career_path")
    private String careerPath;

    @Column(name = "who_should_choose", columnDefinition = "TEXT")
    private String whoShouldChoose;
}