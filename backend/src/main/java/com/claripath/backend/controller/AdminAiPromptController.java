package com.claripath.backend.controller;

import com.claripath.backend.entity.AiPrompt;
import com.claripath.backend.service.AiPromptService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/ai-prompts")
public class AdminAiPromptController {

    @Autowired
    private AiPromptService service;

    @PostMapping
    public AiPrompt addPrompt(@RequestBody AiPrompt prompt){
        return service.addPrompt(prompt);
    }

    @GetMapping
    public List<AiPrompt> getPrompts(){
        return service.getAllPrompts();
    }

    @PutMapping("/{id}")
    public AiPrompt updatePrompt(@PathVariable Long id,
                                 @RequestBody AiPrompt prompt){
        return service.updatePrompt(id, prompt);
    }

    @DeleteMapping("/{id}")
    public void deletePrompt(@PathVariable Long id){
        service.deletePrompt(id);
    }
}