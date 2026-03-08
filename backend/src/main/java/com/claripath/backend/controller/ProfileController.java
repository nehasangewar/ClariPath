package com.claripath.backend.controller;

import com.claripath.backend.entity.StudentProfile;
import com.claripath.backend.profile.ProfileCompletionRequest;
import com.claripath.backend.service.ProfileService;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/profile")
public class ProfileController {

    private final ProfileService profileService;

    public ProfileController(ProfileService profileService) {
        this.profileService = profileService;
    }

    @GetMapping("/me")
    public Map<String, Object> getProfile(Authentication authentication) {
        String email = authentication.getName();
        StudentProfile profile = profileService.getProfile(email);

        Map<String, Object> response = new HashMap<>();
        response.put("status", profile.getStatus());
        response.put("careerGoal", profile.getCareerGoal());
        response.put("trueLevel", profile.getTrueLevel());
        response.put("college", profile.getCollege());
        response.put("universityId", profile.getUniversityId());
        return response;
    }

    @PostMapping("/complete")
    public String completeProfile(
            Authentication authentication,
            @RequestBody ProfileCompletionRequest request
    ) {
        String email = authentication.getName();
        profileService.completeProfile(email, request);
        return "Profile completed successfully";
    }
}