package com.capitalhub.dashboard.controller;

import com.capitalhub.jobs.repository.JobOfferRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/rep/dashboard") // ✅ AÑADIDO /rep para coincidir con el frontend
@RequiredArgsConstructor
public class DashboardController {

    private final JobOfferRepository jobOfferRepository;

    @GetMapping("/stats")
    @PreAuthorize("hasAuthority('REP')")
    public ResponseEntity<Map<String, Object>> getStats(Principal principal) {
        Map<String, Object> stats = new HashMap<>();
        
        long totalOffers = jobOfferRepository.count();

        Map<String, Object> monthlyStats = new HashMap<>();
        monthlyStats.put("callsMade", 0);
        monthlyStats.put("closures", 0);
        monthlyStats.put("avgTicket", 0);
        monthlyStats.put("estimatedCommission", 0);

        stats.put("monthlyStats", monthlyStats);
        stats.put("latestProcesses", Collections.emptyList());
        stats.put("totalOffers", totalOffers);
        
        return ResponseEntity.ok(stats);
    }
}