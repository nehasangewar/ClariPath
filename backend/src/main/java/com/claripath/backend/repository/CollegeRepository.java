package com.claripath.backend.repository;

import com.claripath.backend.entity.College;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CollegeRepository extends JpaRepository<College, Long> {
    List<College> findByUniversityIdOrderByNameAsc(Long universityId);
}