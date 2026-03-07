package com.claripath.backend.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Table(name = "roadmap_snapshots")
@Data
public class RoadmapSnapshot {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long userId;
    private Integer semester;
    @Column(columnDefinition = "TEXT")
    private String roadmapJson;
    private LocalDateTime generatedAt;
}