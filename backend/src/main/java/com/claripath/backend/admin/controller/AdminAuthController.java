package com.claripath.backend.admin.controller;

import com.claripath.backend.admin.dto.AdminAuthResponse;
import com.claripath.backend.admin.service.AdminAuthService;
import org.springframework.web.bind.annotation.*;
import com.claripath.backend.controller.AdminLoginRequest;

@RestController
@RequestMapping("/api/admin")
public class AdminAuthController {

    private final AdminAuthService adminAuthService;

    public AdminAuthController(AdminAuthService adminAuthService) {
        this.adminAuthService = adminAuthService;
    }

    @PostMapping("/login")
    public AdminAuthResponse login(@RequestBody AdminLoginRequest request) {

        String token = adminAuthService.login(
                request.getEmail(),
                request.getPassword()
        );

        return new AdminAuthResponse(token);
    }
}