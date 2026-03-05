package com.claripath.backend.controller;

import com.claripath.backend.profile.ProfileCompletionRequest;
import com.claripath.backend.service.ProfileService;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/profile")
public class ProfileController {

    private final ProfileService profileService;

    public ProfileController(ProfileService profileService) {
        this.profileService = profileService;
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