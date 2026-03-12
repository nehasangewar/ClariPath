package com.claripath.backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "admins")
public class Admin {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String email;

    private String password;

    private String role;

    public Long getId() { return id; }

    public String getEmail() { return email; }

    public String getPassword() { return password; }

    public String getRole() { return role; }

    public void setEmail(String email) { this.email = email; }

    public void setPassword(String password) { this.password = password; }

    public void setRole(String role) { this.role = role; }
}