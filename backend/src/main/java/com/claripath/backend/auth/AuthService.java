package com.claripath.backend.auth;

import com.claripath.backend.entity.Role;
import com.claripath.backend.entity.StudentProfile;
import com.claripath.backend.entity.User;
import com.claripath.backend.repository.StudentProfileRepository;
import com.claripath.backend.repository.UserRepository;
import com.claripath.backend.security.JwtService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final StudentProfileRepository studentProfileRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthService(
            UserRepository userRepository,
            StudentProfileRepository studentProfileRepository,
            PasswordEncoder passwordEncoder,
            JwtService jwtService,
            AuthenticationManager authenticationManager
    ) {
        this.userRepository = userRepository;
        this.studentProfileRepository = studentProfileRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
    }

    // ── helper to build UserInfo from User entity ──
    private AuthResponse.UserInfo buildUserInfo(User user) {
        return new AuthResponse.UserInfo(
            user.getId(),
            user.getName(),
            user.getEmail(),
            user.getRole().name(),
            user.getCollege(),
            user.getBranch(),
            user.getSemester(),
            user.getStreak(),
            user.getBio(),
            user.getGithub(),
            user.getLinkedin(),
            user.getLeetcode(),
            user.getTrueLevel(),
            user.getStartPoint(),
            user.getTrackStatus(),
            user.getSkippedTopics()
        );
    }

    public AuthResponse register(RegisterRequest request) {
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("Email already registered");
        }

        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(Role.STUDENT);

        User savedUser = userRepository.save(user);

        StudentProfile profile = new StudentProfile();
        profile.setUser(savedUser);
        profile.setStatus("ONBOARDING");
        studentProfileRepository.save(profile);

        String token = jwtService.generateToken(savedUser.getEmail());

        return new AuthResponse(token, buildUserInfo(savedUser));
    }

    public AuthResponse login(LoginRequest request) {
        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                request.getEmail(),
                request.getPassword()
            )
        );

        User user = userRepository.findByEmail(request.getEmail())
            .orElseThrow(() -> new RuntimeException("User not found"));

        String token = jwtService.generateToken(user.getEmail(), user.getRole().name());

        return new AuthResponse(token, buildUserInfo(user));
    }
}