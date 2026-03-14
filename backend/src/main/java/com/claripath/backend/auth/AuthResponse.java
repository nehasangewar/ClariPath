package com.claripath.backend.auth;

public class AuthResponse {

    private String token;
    private UserInfo user;

    public AuthResponse(String token, UserInfo user) {
        this.token = token;
        this.user = user;
    }

    public String getToken() { return token; }
    public void setToken(String token) { this.token = token; }

    public UserInfo getUser() { return user; }
    public void setUser(UserInfo user) { this.user = user; }

    public static class UserInfo {
        private Long id;
        private String name;
        private String email;
        private String role;
        private String college;
        private String branch;
        private Integer semester;
        private Integer streak;
        private String bio;
        private String github;
        private String linkedin;
        private String leetcode;
        private String trueLevel;
        private String startPoint;
        private String trackStatus;
        private String skippedTopics;

        public UserInfo(Long id, String name, String email, String role,
                        String college, String branch, Integer semester,
                        Integer streak, String bio, String github,
                        String linkedin, String leetcode, String trueLevel,
                        String startPoint, String trackStatus, String skippedTopics) {
            this.id = id;
            this.name = name;
            this.email = email;
            this.role = role;
            this.college = college;
            this.branch = branch;
            this.semester = semester;
            this.streak = streak;
            this.bio = bio;
            this.github = github;
            this.linkedin = linkedin;
            this.leetcode = leetcode;
            this.trueLevel = trueLevel;
            this.startPoint = startPoint;
            this.trackStatus = trackStatus;
            this.skippedTopics = skippedTopics;
        }

        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }

        public String getName() { return name; }
        public void setName(String name) { this.name = name; }

        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }

        public String getRole() { return role; }
        public void setRole(String role) { this.role = role; }

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
}