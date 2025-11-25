package com.capitalhub.applications.controller;

import com.capitalhub.auth.entity.User;
import com.capitalhub.applications.dto.ApplyRequest;
import com.capitalhub.applications.dto.ApplicationResponse;
import com.capitalhub.applications.entity.ApplicationStatus;
import com.capitalhub.applications.service.JobApplicationService;
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
public class JobApplicationController {

    private final JobApplicationService applicationService;

    // ✅ REP aplica a una oferta
    // POST /api/rep/jobs/{offerId}/apply
    @PreAuthorize("hasRole('REP')")
    @PostMapping("/rep/jobs/{offerId}/apply")
    @ResponseStatus(HttpStatus.CREATED)
    public ApplicationResponse apply(@PathVariable Long offerId,
                                     @Valid @RequestBody(required = false) ApplyRequest req,
                                     Principal principal) {
        Long repUserId = extractUserId(principal);
        return applicationService.applyToOffer(repUserId, offerId, req);
    }

    // ✅ REP lista sus aplicaciones
    // GET /api/rep/applications
    @PreAuthorize("hasRole('REP')")
    @GetMapping("/rep/applications")
    public List<ApplicationResponse> myApplications(Principal principal) {
        Long repUserId = extractUserId(principal);
        return applicationService.listMyApplications(repUserId);
    }

    // ✅ Empresa lista aplicaciones de una oferta
    // GET /api/company/jobs/{offerId}/applications
    @PreAuthorize("hasRole('COMPANY')")
    @GetMapping("/company/jobs/{offerId}/applications")
    public List<ApplicationResponse> listApplicationsForOffer(@PathVariable Long offerId,
                                                              Principal principal) {
        Long companyUserId = extractUserId(principal);
        return applicationService.listApplicationsForOffer(companyUserId, offerId);
    }

    // ✅ Empresa actualiza estado de una aplicación
    // PATCH /api/company/applications/{id}/status?status=INTERVIEW
    @PreAuthorize("hasRole('COMPANY')")
    @PatchMapping("/company/applications/{id}/status")
    public ApplicationResponse updateStatus(
            @PathVariable Long id,
            @RequestParam ApplicationStatus status,
            @RequestParam(required = false) String companyNotes,
            @RequestParam(required = false) String interviewUrl,
            Principal principal
    ) {
        Long companyUserId = extractUserId(principal);
        return applicationService.updateApplicationStatus(
                companyUserId, id, status, companyNotes, interviewUrl
        );
    }

    private Long extractUserId(Principal principal) {
        if (principal == null) throw new IllegalArgumentException("Usuario no autenticado");
        if (principal instanceof User user) return user.getId();
        throw new IllegalStateException("No se pudo extraer el userId del token");
    }
}
