package com.claripath.backend.service;

import com.claripath.backend.entity.University;
import com.claripath.backend.repository.UniversityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UniversityService {

    @Autowired
    private UniversityRepository repository;

    public University addUniversity(University university){
        return repository.save(university);
    }

    public List<University> getAllUniversities(){
        return repository.findAll();
    }

    public void deleteUniversity(Long id){
        repository.deleteById(id);
    }
}