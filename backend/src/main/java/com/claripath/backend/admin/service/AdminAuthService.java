package com.claripath.backend.admin.service;

import com.claripath.backend.entity.Admin;
import com.claripath.backend.repository.AdminRepository;
import com.claripath.backend.security.JwtService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AdminAuthService {

    private final AdminRepository adminRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AdminAuthService(
            AdminRepository adminRepository,
            PasswordEncoder passwordEncoder,
            JwtService jwtService) {
        this.adminRepository = adminRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    public String login(String email, String password) {

        Admin admin = adminRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Admin not found"));

        if (!passwordEncoder.matches(password, admin.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        // Strip "ROLE_" prefix if already present, so token always stores plain "ADMIN"
        String role = admin.getRole().replace("ROLE_", "");
        return jwtService.generateToken(admin.getEmail(), role);
    }
}