package com.capitalhub.jobs.controller;

import com.capitalhub.auth.entity.User;
import com.capitalhub.jobs.dto.JobOfferRequest;
import com.capitalhub.jobs.dto.JobOfferResponse;
import com.capitalhub.jobs.entity.JobStatus;
import com.capitalhub.jobs.service.JobOfferService;
import com.capitalhub.rep.entity.RepRole;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class JobOfferController {

    private final JobOfferService jobOfferService;

    // ✅ 1) Empresa crea una oferta
    // POST /api/company/jobs
    @PreAuthorize("hasRole('COMPANY')")
    @PostMapping("/company/jobs")
    @ResponseStatus(HttpStatus.CREATED)
    public JobOfferResponse createOffer(@Valid @RequestBody JobOfferRequest req,
                                        Principal principal) {

        Long companyUserId = extractUserId(principal);
        return jobOfferService.createOffer(companyUserId, req);
    }

    // ✅ 2) Empresa lista sus ofertas
    // GET /api/company/jobs
    @PreAuthorize("hasRole('COMPANY')")
    @GetMapping("/company/jobs")
    public List<JobOfferResponse> listCompanyOffers(Principal principal) {

        Long companyUserId = extractUserId(principal);
        return jobOfferService.listCompanyOffers(companyUserId);
    }

    // ✅ 3) Empresa cambia estado (ACTIVE / PAUSED / CLOSED)
    // PATCH /api/company/jobs/{id}/status?status=PAUSED
    @PreAuthorize("hasRole('COMPANY')")
    @PatchMapping("/company/jobs/{id}/status")
    public JobOfferResponse updateStatus(@PathVariable Long id,
                                         @RequestParam JobStatus status,
                                         Principal principal) {

        Long companyUserId = extractUserId(principal);
        return jobOfferService.updateStatus(companyUserId, id, status);
    }

    // ✅ 4) REP lista ofertas filtradas por rol
    // GET /api/rep/jobs?role=SETTER
    @PreAuthorize("hasRole('REP')")
    @GetMapping("/rep/jobs")
    public List<JobOfferResponse> listOffersForRep(@RequestParam RepRole role) {

        return jobOfferService.listOffersForRep(role);
    }

    // ✅ 5) Detalle de oferta (loggeados)
    // GET /api/jobs/{id}
    @PreAuthorize("isAuthenticated()")
    @GetMapping("/jobs/{id}")
    public JobOfferResponse getOffer(@PathVariable Long id) {

        return jobOfferService.getOffer(id);
    }

    /**
     * Helper para obtener el ID del User desde el Principal.
     * En tu proyecto, User implementa UserDetails, así que principal suele ser User.
     */
    private Long extractUserId(Principal principal) {
        if (principal == null) {
            throw new IllegalArgumentException("Usuario no autenticado");
        }

        // Caso estándar: el principal es tu entidad User
        if (principal instanceof User user) {
            return user.getId();
        }

        // Caso alternativo: solo viene username/email
        // En ese caso necesitaríamos buscar por email (lo haremos si hiciera falta)
        throw new IllegalStateException("No se pudo extraer el userId del token");
    }
}
