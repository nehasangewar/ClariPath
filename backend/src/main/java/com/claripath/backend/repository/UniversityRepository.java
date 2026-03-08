package com.claripath.backend.repository;

import com.claripath.backend.entity.University;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface UniversityRepository extends JpaRepository<University, Long> {
    List<University> findAllByOrderByNameAsc();
}