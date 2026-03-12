package com.claripath.backend.controller;

import com.claripath.backend.dto.AdminDashboardStats;
import com.claripath.backend.service.AdminDashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/dashboard")
public class AdminDashboardController {

    @Autowired
    private AdminDashboardService dashboardService;

    @GetMapping
    public AdminDashboardStats getStats(){
        return dashboardService.getStats();
    }
}