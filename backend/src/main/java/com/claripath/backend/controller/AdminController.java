package com.claripath.backend.controller;

import com.claripath.backend.entity.Syllabus;
import com.claripath.backend.service.AdminService;
import org.springframework.web.bind.annotation.*;
import com.claripath.backend.controller.AdminLoginRequest;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final AdminService adminService;

    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    // ❌ DELETE any login() method here if present

    @PostMapping("/syllabus")
    public Syllabus addSyllabus(@RequestBody Syllabus syllabus) {
        return adminService.addSyllabus(syllabus);
    }

    @GetMapping("/syllabus")
    public List<Syllabus> getAllSyllabus() {
        return adminService.getAllSyllabus();
    }

    @DeleteMapping("/syllabus/{id}")
    public void deleteSyllabus(@PathVariable Long id) {
        adminService.deleteSyllabus(id);
    }
}