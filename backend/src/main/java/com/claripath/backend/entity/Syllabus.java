package com.claripath.backend.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Column;

@Entity
@Table(name = "syllabus")
public class Syllabus {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String branch;

    private Integer semester;

    @Column(name = "subject_name")
    private String subjectName;

    private String topics;

    public String getBranch() {
        return branch;
    }

    public Integer getSemester() {
        return semester;
    }

    public String getSubjectName() {
        return subjectName;
    }

    public String getTopics() {
        return topics;
    }
}