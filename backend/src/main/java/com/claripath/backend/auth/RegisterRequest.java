package com.claripath.backend.auth;

public class RegisterRequest {

    private String name;
    private String email;
    private String password;
    private String college;
    private Long collegeId;
    private Long universityId;

    // Getters
    public String getName() { return name; }
    public String getEmail() { return email; }
    public String getPassword() { return password; }
    public String getCollege() { return college; }
    public Long getCollegeId() { return collegeId; }
    public Long getUniversityId() { return universityId; }

    // Setters — required for Jackson to deserialize JSON into this object
    public void setName(String name) { this.name = name; }
    public void setEmail(String email) { this.email = email; }
    public void setPassword(String password) { this.password = password; }
    public void setCollege(String college) { this.college = college; }
    public void setCollegeId(Long collegeId) { this.collegeId = collegeId; }
    public void setUniversityId(Long universityId) { this.universityId = universityId; }
}