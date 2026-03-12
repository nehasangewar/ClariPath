package com.claripath.backend.service;

import com.claripath.backend.entity.CareerGoal;
import com.claripath.backend.repository.CareerGoalRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CareerGoalService {

    @Autowired
    private CareerGoalRepository repository;

    public CareerGoal addGoal(CareerGoal goal){
        return repository.save(goal);
    }

    public List<CareerGoal> getAllGoals(){
        return repository.findAll();
    }

    public void deleteGoal(Long id){
        repository.deleteById(id);
    }
}