package com.claripath.backend.service;

import com.claripath.backend.entity.Syllabus;
import com.claripath.backend.repository.SyllabusRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class SyllabusService {

    @Autowired
    private SyllabusRepository syllabusRepository;

    /**
     * Fetches all syllabus topics for a student's college, branch, and semester
     * and returns them as a single formatted string ready to inject into AI prompt.
     */
    public String getSyllabusContext(Long collegeId, Long branchId, Integer semester) {
        List<Syllabus> syllabusList = syllabusRepository
                .findByCollegeIdAndBranchIdAndSemester(collegeId, branchId, semester);

        if (syllabusList == null || syllabusList.isEmpty()) {
            return "No syllabus data available for this branch and semester.";
        }

        // Group topics by subject and format as readable text
        String context = syllabusList.stream()
                .map(s -> s.getTopics())
                .collect(Collectors.joining("\n"));

        return "COLLEGE SYLLABUS FOR SEMESTER " + semester + ":\n" + context;
    }
}