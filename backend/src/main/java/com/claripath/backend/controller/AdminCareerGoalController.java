package com.claripath.backend.controller;

import com.claripath.backend.entity.CareerGoal;
import com.claripath.backend.service.CareerGoalService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/career-goals")
public class AdminCareerGoalController {

    @Autowired
    private CareerGoalService service;

    @PostMapping
    public CareerGoal addGoal(@RequestBody CareerGoal goal){
        return service.addGoal(goal);
    }

    @GetMapping
    public List<CareerGoal> getGoals(){
        System.out.println("ADMIN GOALS CONTROLLER HIT");
        return service.getAllGoals();
    }
    @DeleteMapping("/{id}")
    public void deleteGoal(@PathVariable Long id){
        service.deleteGoal(id);
    }
}