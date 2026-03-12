package com.claripath.backend.admin.dto;

public class AdminAuthResponse {

    private String token;

    public AdminAuthResponse(String token) {
        this.token = token;
    }

    public String getToken() {
        return token;
    }
}