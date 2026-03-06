package com.claripath.backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "career_goals")
public class CareerGoal {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String domain;
    private String field;
    @Column(columnDefinition = "TEXT")
    private String description;
    @Column(name = "what_you_learn", columnDefinition = "TEXT")
    private String whatYouLearn;
    @Column(name = "what_you_do", columnDefinition = "TEXT")
    private String whatYouDo;
    @Column(name = "salary_range")
    private String salaryRange;
    @Column(name = "top_companies")
    private String topCompanies;

    public Long getId() { return id; }
    public String getTitle() { return title; }
    public String getDomain() { return domain; }
    public String getField() { return field; }
    public String getDescription() { return description; }
    public String getWhatYouLearn() { return whatYouLearn; }
    public String getWhatYouDo() { return whatYouDo; }
    public String getSalaryRange() { return salaryRange; }
    public String getTopCompanies() { return topCompanies; }
}