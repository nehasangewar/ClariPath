package com.claripath.backend.service;

import com.claripath.backend.dto.DashboardResponse;
import com.claripath.backend.entity.LearningPath;
import com.claripath.backend.repository.LearningPathRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DashboardService {

    private final LearningPathRepository learningPathRepository;

    public DashboardService(LearningPathRepository learningPathRepository) {
        this.learningPathRepository = learningPathRepository;
    }

    public DashboardResponse getDashboard(Long userId) {

        List<LearningPath> modules =
                learningPathRepository.findByUserIdOrderByOrderNo(userId);

        int totalTasks = modules.size();

        int completedTasks = (int) modules.stream()
                .filter(LearningPath::getCompleted)
                .count();

        String currentModule = null;
        String nextModule = null;

        for (int i = 0; i < modules.size(); i++) {

            if (!modules.get(i).getCompleted()) {

                currentModule = modules.get(i).getModuleName();

                if (i + 1 < modules.size()) {
                    nextModule = modules.get(i + 1).getModuleName();
                }

                break;
            }
        }

        return new DashboardResponse(
                totalTasks,
                completedTasks,
                currentModule,
                nextModule
        );
    }
}