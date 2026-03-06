package com.claripath.backend.repository;

import com.claripath.backend.entity.CareerGoal;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CareerGoalRepository extends JpaRepository<CareerGoal, Long> {
    List<CareerGoal> findByField(String field);
}