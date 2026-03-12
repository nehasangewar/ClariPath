package com.claripath.backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "syllabus")
public class Syllabus {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "college_id")
    private Long collegeId;

    @Column(name = "branch_id")
    private Long branchId;

    private Integer semester;

    @Column(name = "subject_id")
    private Long subjectId;

    private String topics;

    public Long getId() {
        return id;
    }

    public Long getCollegeId() {
        return collegeId;
    }

    public Long getBranchId() {
        return branchId;
    }

    public Integer getSemester() {
        return semester;
    }

    public Long getSubjectId() {
        return subjectId;
    }

    public String getTopics() {
        return topics;
    }

    public void setCollegeId(Long collegeId) {
        this.collegeId = collegeId;
    }

    public void setBranchId(Long branchId) {
        this.branchId = branchId;
    }

    public void setSemester(Integer semester) {
        this.semester = semester;
    }

    public void setSubjectId(Long subjectId) {
        this.subjectId = subjectId;
    }

    public void setTopics(String topics) {
        this.topics = topics;
    }
}