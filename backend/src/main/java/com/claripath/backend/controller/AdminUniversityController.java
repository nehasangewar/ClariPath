package com.claripath.backend.controller;

import com.claripath.backend.entity.University;
import com.claripath.backend.service.UniversityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/universities")
public class AdminUniversityController {

    @Autowired
    private UniversityService service;

    @PostMapping
    public University addUniversity(@RequestBody University university){
        return service.addUniversity(university);
    }

    @GetMapping
    public List<University> getUniversities(){
        return service.getAllUniversities();
    }

    @DeleteMapping("/{id}")
    public void deleteUniversity(@PathVariable Long id){
        service.deleteUniversity(id);
    }
}