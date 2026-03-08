package com.claripath.backend.controller;

import com.claripath.backend.entity.College;
import com.claripath.backend.entity.University;
import com.claripath.backend.repository.CollegeRepository;
import com.claripath.backend.repository.UniversityRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/universities")
@RequiredArgsConstructor
public class UniversityController {

    private final UniversityRepository universityRepository;
    private final CollegeRepository collegeRepository;

    // GET /api/universities — all universities sorted A-Z
    @GetMapping
    public ResponseEntity<List<University>> getAllUniversities() {
        return ResponseEntity.ok(universityRepository.findAllByOrderByNameAsc());
    }

    // GET /api/universities/{id}/colleges — colleges under a university
    @GetMapping("/{id}/colleges")
    public ResponseEntity<List<College>> getCollegesByUniversity(@PathVariable Long id) {
        return ResponseEntity.ok(collegeRepository.findByUniversityIdOrderByNameAsc(id));
    }
}