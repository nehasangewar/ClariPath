package com.claripath.backend.repository;

import com.claripath.backend.entity.OnboardingQuestion;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface OnboardingQuestionRepository extends JpaRepository<OnboardingQuestion, Long> {
    List<OnboardingQuestion> findByFieldAndQuestionTypeOrderByOrderNumberAsc(String field, String questionType);
}