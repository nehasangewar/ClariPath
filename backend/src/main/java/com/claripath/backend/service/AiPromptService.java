package com.claripath.backend.service;

import com.claripath.backend.entity.AiPrompt;
import com.claripath.backend.repository.AiPromptRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AiPromptService {

    @Autowired
    private AiPromptRepository repository;

    public AiPrompt addPrompt(AiPrompt prompt){
        return repository.save(prompt);
    }

    public List<AiPrompt> getAllPrompts(){
        return repository.findAll();
    }

    public AiPrompt updatePrompt(Long id, AiPrompt prompt){
        prompt.setId(id);
        return repository.save(prompt);
    }

    public void deletePrompt(Long id){
        repository.deleteById(id);
    }
}