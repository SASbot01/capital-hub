package com.capitalhub.company.controller;

import com.capitalhub.auth.entity.User;
import com.capitalhub.company.dto.CompanyProfileResponse;
import com.capitalhub.company.dto.CompanyProfileUpdateRequest;
import com.capitalhub.company.service.CompanyService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping("/api/company")
@RequiredArgsConstructor
public class CompanyController {

    private final CompanyService companyService;

    // ✅ Obtener perfil de empresa (para el dashboard settings de company)
    // GET /api/company/me
    @PreAuthorize("hasAuthority('COMPANY')")
    @GetMapping("/me")
    public CompanyProfileResponse getMyProfile(Principal principal) {
        Long userId = extractUserId(principal);
        return companyService.getMyProfile(userId);
    }

    // ✅ Actualizar perfil de empresa
    // PUT /api/company/me
    @PreAuthorize("hasAuthority('COMPANY')")
    @PutMapping("/me")
    public CompanyProfileResponse updateMyProfile(@Valid @RequestBody CompanyProfileUpdateRequest req,
                                                  Principal principal) {
        Long userId = extractUserId(principal);
        return companyService.updateMyProfile(userId, req);
    }

    // Helper
    private Long extractUserId(Principal principal) {
        if (principal == null) {
            throw new IllegalArgumentException("Usuario no autenticado");
        }
        if (principal instanceof User user) {
            return user.getId();
        }
        throw new IllegalStateException("No se pudo extraer el userId del token");
    }
}
