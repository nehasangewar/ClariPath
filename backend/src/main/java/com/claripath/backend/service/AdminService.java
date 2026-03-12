package com.claripath.backend.service;

import com.claripath.backend.auth.AuthResponse;
import com.claripath.backend.entity.Role;
import com.claripath.backend.entity.Syllabus;
import com.claripath.backend.entity.User;
import com.claripath.backend.repository.SyllabusRepository;
import com.claripath.backend.repository.UserRepository;
import com.claripath.backend.security.JwtService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminService {

    private final SyllabusRepository syllabusRepository;
    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AdminService(
            SyllabusRepository syllabusRepository,
            UserRepository userRepository,
            JwtService jwtService,
            AuthenticationManager authenticationManager
    ) {
        this.syllabusRepository = syllabusRepository;
        this.userRepository = userRepository;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
    }

    // ===============================
    // ADMIN LOGIN
    // ===============================
    public AuthResponse login(String email, String password) {

        // Authenticate credentials
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(email, password)
        );

        // Fetch user
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // ✅ Reject non-admin users
        if (user.getRole() != Role.ADMIN) {
            throw new BadCredentialsException("Access denied: not an admin");
        }

        // Generate JWT
        String token = jwtService.generateToken(user.getEmail());

        AuthResponse.UserInfo userInfo = new AuthResponse.UserInfo(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getRole().name()
        );

        return new AuthResponse(token, userInfo);
    }

    // ===============================
    // SYLLABUS
    // ===============================
    public Syllabus addSyllabus(Syllabus syllabus) {
        return syllabusRepository.save(syllabus);
    }

    public List<Syllabus> getAllSyllabus() {
        return syllabusRepository.findAll();
    }

    public void deleteSyllabus(Long id) {
        syllabusRepository.deleteById(id);
    }
}