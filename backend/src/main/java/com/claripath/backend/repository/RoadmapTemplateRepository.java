package com.claripath.backend.repository;

import com.claripath.backend.entity.RoadmapTemplate;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RoadmapTemplateRepository extends JpaRepository<RoadmapTemplate, Long> {

    List<RoadmapTemplate>
    findByCareerGoalIgnoreCaseAndLevelIgnoreCaseOrderByOrderNoAsc(
            String careerGoal,
            String level
    );
}