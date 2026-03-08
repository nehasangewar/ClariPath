package com.claripath.backend.repository;

import com.claripath.backend.entity.LearningPath;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LearningPathRepository extends JpaRepository<LearningPath, Long> {

    List<LearningPath> findByUserId(Long userId);

    List<LearningPath> findByUserIdOrderByOrderNo(Long userId);

    void deleteByUserId(Long userId);

    long countByUserId(Long userId);

    long countByUserIdAndCompletedTrue(Long userId);
}