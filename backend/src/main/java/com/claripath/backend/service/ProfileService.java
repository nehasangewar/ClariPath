package com.claripath.backend.service;

import com.claripath.backend.entity.StudentProfile;
import com.claripath.backend.entity.User;
import com.claripath.backend.profile.ProfileCompletionRequest;
import com.claripath.backend.repository.StudentProfileRepository;
import com.claripath.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class ProfileService {

    private final StudentProfileRepository profileRepository;
    private final UserRepository userRepository;
    private final LearningPathService learningPathService;

    public ProfileService(
            StudentProfileRepository profileRepository,
            UserRepository userRepository,
            LearningPathService learningPathService
    ) {
        this.profileRepository = profileRepository;
        this.userRepository = userRepository;
        this.learningPathService = learningPathService;
    }

    public void completeProfile(String email, ProfileCompletionRequest request) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        StudentProfile profile = profileRepository
                .findByUserId(user.getId())
                .orElseThrow(() -> new RuntimeException("Profile not found"));

        profile.setFullName(request.getFullName());
        profile.setCareerGoal(request.getCareerGoal());
        profile.setCurrentLevel(request.getCurrentLevel());
        profile.setStatus("ACTIVE");

        profileRepository.save(profile);

        // generate roadmap
        learningPathService.generatePath(profile);
    }

    public StudentProfile getProfile(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return profileRepository
                .findByUserId(user.getId())
                .orElseThrow(() -> new RuntimeException("Profile not found"));
    }
}