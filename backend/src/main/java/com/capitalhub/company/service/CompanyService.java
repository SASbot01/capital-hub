package com.capitalhub.company.service;

import com.capitalhub.company.dto.CompanyProfileResponse;
import com.capitalhub.company.dto.CompanyProfileUpdateRequest;
import com.capitalhub.company.entity.Company;
import com.capitalhub.company.repository.CompanyRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

@Service
@RequiredArgsConstructor
public class CompanyService {

    private final CompanyRepository companyRepository;

    /**
     * Devuelve el perfil de empresa asociado al userId (del token).
     */
    public CompanyProfileResponse getMyProfile(Long userId) {
        Company company = companyRepository.findByUserId(userId)
                .orElseThrow(() -> new EntityNotFoundException("Empresa no encontrada para este usuario"));

        return mapToResponse(company);
    }

    /**
     * Actualiza el perfil de empresa (datos generales, métricas y links).
     */
    public CompanyProfileResponse updateMyProfile(Long userId, CompanyProfileUpdateRequest req) {

        Company company = companyRepository.findByUserId(userId)
                .orElseThrow(() -> new EntityNotFoundException("Empresa no encontrada para este usuario"));

        // Actualizamos solo si nos mandan valor (para que sea tipo "patch" sencillo)
        if (StringUtils.hasText(req.getName())) {
            company.setName(req.getName());
        }
        if (req.getWebsite() != null) {
            company.setWebsite(req.getWebsite());
        }
        if (req.getIndustry() != null) {
            company.setIndustry(req.getIndustry());
        }
        if (req.getDescription() != null) {
            company.setDescription(req.getDescription());
        }

        if (req.getMonthlyRevenue() != null) {
            company.setMonthlyRevenue(req.getMonthlyRevenue());
        }
        if (req.getMonthlyCalls() != null) {
            company.setMonthlyCalls(req.getMonthlyCalls());
        }
        if (req.getMonthlyClosedDeals() != null) {
            company.setMonthlyClosedDeals(req.getMonthlyClosedDeals());
        }
        if (req.getWinRate() != null) {
            company.setWinRate(req.getWinRate());
        }

        if (req.getOfferVideoUrl() != null) {
            company.setOfferVideoUrl(req.getOfferVideoUrl());
        }

        if (req.getCalendlyUrl() != null) {
            company.setCalendlyUrl(req.getCalendlyUrl());
        }
        if (req.getZoomUrl() != null) {
            company.setZoomUrl(req.getZoomUrl());
        }
        if (req.getWhatsappUrl() != null) {
            company.setWhatsappUrl(req.getWhatsappUrl());
        }

        Company saved = companyRepository.save(company);
        return mapToResponse(saved);
    }

    // -----------------------
    // Mapper
    // -----------------------
    private CompanyProfileResponse mapToResponse(Company c) {
        return CompanyProfileResponse.builder()
                .id(c.getId())
                .userId(c.getUser() != null ? c.getUser().getId() : null)
                .name(c.getName())
                .website(c.getWebsite())
                .industry(c.getIndustry())
                .description(c.getDescription())
                .monthlyRevenue(c.getMonthlyRevenue())
                .monthlyCalls(c.getMonthlyCalls())
                .monthlyClosedDeals(c.getMonthlyClosedDeals())
                .winRate(c.getWinRate())
                .offerVideoUrl(c.getOfferVideoUrl())
                .calendlyUrl(c.getCalendlyUrl())
                .zoomUrl(c.getZoomUrl())
                .whatsappUrl(c.getWhatsappUrl())
                .active(c.getActive())
                .createdAt(c.getCreatedAt())
                .updatedAt(c.getUpdatedAt())
                .build();
    }
}
