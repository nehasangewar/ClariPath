package com.claripath.backend.repository;

import com.claripath.backend.entity.RoadmapSnapshot;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface RoadmapSnapshotRepository extends JpaRepository<RoadmapSnapshot, Long> {
    Optional<RoadmapSnapshot> findTopByUserIdOrderByGeneratedAtDesc(Long userId);
    void deleteByUserId(Long userId);

}