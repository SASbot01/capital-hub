package com.capitalhub.dashboard.controller;

import com.capitalhub.jobs.repository.JobOfferRepository;
import com.capitalhub.applications.repository.JobApplicationRepository;
import com.capitalhub.auth.entity.User;
import com.capitalhub.company.repository.CompanyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/dashboard")
@RequiredArgsConstructor
public class DashboardController {

    private final JobOfferRepository jobOfferRepository;
    private final JobApplicationRepository applicationRepository;
    private final CompanyRepository companyRepository;

    @GetMapping("/stats")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Map<String, Object>> getStats(Principal principal) {
        Map<String, Object> stats = new HashMap<>();
        
        // Lógica simple: Si es admin o user general, ve totales. 
        // En un MVP real, aquí filtrarías por el ID de la empresa si el usuario es COMPANY.
        
        long totalOffers = jobOfferRepository.count();
        long totalApps = applicationRepository.count();
        long totalCompanies = companyRepository.count();

        stats.put("totalOffers", totalOffers);
        stats.put("totalApplications", totalApps);
        stats.put("totalCompanies", totalCompanies);
        
        return ResponseEntity.ok(stats);
    }
}