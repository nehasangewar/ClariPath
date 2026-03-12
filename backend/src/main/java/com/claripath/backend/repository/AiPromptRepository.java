package com.claripath.backend.repository;

import com.claripath.backend.entity.AiPrompt;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AiPromptRepository extends JpaRepository<AiPrompt, Long> {
}