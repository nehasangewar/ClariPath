package com.claripath.backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(unique = true, nullable = false)
    private String email;

    private String password;

    @Enumerated(EnumType.STRING)
    private Role role;

    @Column(name = "college")
    private String college;

    @Column(name = "branch")
    private String branch;

    @Column(name = "semester")
    private Integer semester;

    @Column(name = "streak")
    private Integer streak = 0;

    @Column(name = "bio")
    private String bio;

    @Column(name = "github")
    private String github;

    @Column(name = "linkedin")
    private String linkedin;

    @Column(name = "leetcode")
    private String leetcode;

    @Column(name = "true_level")
    private String trueLevel;

    @Column(name = "start_point")
    private String startPoint;

    @Column(name = "track_status")
    private String trackStatus = "On Track";

    @Column(name = "skipped_topics", columnDefinition = "TEXT")
    private String skippedTopics;

    // ── Existing Getters & Setters ──

    public Long getId() { return id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public Role getRole() { return role; }
    public void setRole(Role role) { this.role = role; }

    // ── New Getters & Setters ──

    public String getCollege() { return college; }
    public void setCollege(String college) { this.college = college; }

    public String getBranch() { return branch; }
    public void setBranch(String branch) { this.branch = branch; }

    public Integer getSemester() { return semester; }
    public void setSemester(Integer semester) { this.semester = semester; }

    public Integer getStreak() { return streak; }
    public void setStreak(Integer streak) { this.streak = streak; }

    public String getBio() { return bio; }
    public void setBio(String bio) { this.bio = bio; }

    public String getGithub() { return github; }
    public void setGithub(String github) { this.github = github; }

    public String getLinkedin() { return linkedin; }
    public void setLinkedin(String linkedin) { this.linkedin = linkedin; }

    public String getLeetcode() { return leetcode; }
    public void setLeetcode(String leetcode) { this.leetcode = leetcode; }

    public String getTrueLevel() { return trueLevel; }
    public void setTrueLevel(String trueLevel) { this.trueLevel = trueLevel; }

    public String getStartPoint() { return startPoint; }
    public void setStartPoint(String startPoint) { this.startPoint = startPoint; }

    public String getTrackStatus() { return trackStatus; }
    public void setTrackStatus(String trackStatus) { this.trackStatus = trackStatus; }

    public String getSkippedTopics() { return skippedTopics; }
    public void setSkippedTopics(String skippedTopics) { this.skippedTopics = skippedTopics; }
}