package com.claripath.backend.repository;

import com.claripath.backend.entity.Syllabus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SyllabusRepository extends JpaRepository<Syllabus, Long> {

    List<Syllabus> findByCollegeIdAndBranchIdAndSemester(
            Long collegeId,
            Long branchId,
            Integer semester
    );
}