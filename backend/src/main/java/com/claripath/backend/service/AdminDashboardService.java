package com.claripath.backend.service;

import com.claripath.backend.dto.AdminDashboardStats;
import com.claripath.backend.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AdminDashboardService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UniversityRepository universityRepository;

    @Autowired
    private CareerGoalRepository careerGoalRepository;

    @Autowired
    private AiPromptRepository aiPromptRepository;

    public AdminDashboardStats getStats(){

        AdminDashboardStats stats = new AdminDashboardStats();

        stats.setTotalStudents(userRepository.count());
        stats.setTotalUniversities(universityRepository.count());
        stats.setTotalCareerGoals(careerGoalRepository.count());
        stats.setTotalPrompts(aiPromptRepository.count());

        return stats;
    }
}