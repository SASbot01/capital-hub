package com.capitalhub.jobs.service;

import com.capitalhub.company.entity.Company;
import com.capitalhub.company.repository.CompanyRepository;
import com.capitalhub.jobs.dto.JobOfferRequest;
import com.capitalhub.jobs.dto.JobOfferResponse;
import com.capitalhub.jobs.entity.JobOffer;
import com.capitalhub.jobs.entity.JobStatus;
import com.capitalhub.jobs.repository.JobOfferRepository;
import com.capitalhub.rep.entity.RepRole;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class JobOfferService {

    private final JobOfferRepository jobOfferRepository;
    private final CompanyRepository companyRepository;

    /**
     * Crear una oferta (solo empresa logueada).
     * Recibe el userId de la empresa (del JWT).
     */
    public JobOfferResponse createOffer(Long companyUserId, JobOfferRequest req) {

        Company company = companyRepository.findByUserId(companyUserId)
                .orElseThrow(() -> new EntityNotFoundException("Empresa no encontrada para este usuario"));

        JobOffer offer = JobOffer.builder()
                .company(company)
                .title(req.getTitle())
                .description(req.getDescription())
                .role(req.getRole())
                .seats(req.getSeats())
                .maxApplicants(req.getSeats() * 20)  // regla MVP seats×20
                .language(req.getLanguage())
                .crm(req.getCrm())
                .commissionPercent(req.getCommissionPercent())
                .avgTicket(req.getAvgTicket())
                .estimatedMonthlyEarnings(req.getEstimatedMonthlyEarnings())
                .modality(req.getModality())
                .market(req.getMarket())
                .calendlyUrl(req.getCalendlyUrl())
                .zoomUrl(req.getZoomUrl())
                .whatsappUrl(req.getWhatsappUrl())
                .status(JobStatus.ACTIVE)
                .active(true)
                .applicantsCount(0)
                .build();

        JobOffer saved = jobOfferRepository.save(offer);
        return mapToResponse(saved);
    }

    /**
     * Listado de ofertas activas para REP filtrando por rol.
     * - Setter -> SETTER + BOTH
     * - Closer -> CLOSER + BOTH
     * - Cold caller -> COLD_CALLER + BOTH
     * - BOTH -> todas las anteriores
     */
    public List<JobOfferResponse> listOffersForRep(RepRole repRole) {

        List<RepRole> allowedRoles = new ArrayList<>();

        switch (repRole) {
            case SETTER -> {
                allowedRoles.add(RepRole.SETTER);
                allowedRoles.add(RepRole.BOTH);
            }
            case CLOSER -> {
                allowedRoles.add(RepRole.CLOSER);
                allowedRoles.add(RepRole.BOTH);
            }
            case COLD_CALLER -> {
                allowedRoles.add(RepRole.COLD_CALLER);
                allowedRoles.add(RepRole.BOTH);
            }
            case BOTH -> {
                allowedRoles.add(RepRole.SETTER);
                allowedRoles.add(RepRole.CLOSER);
                allowedRoles.add(RepRole.COLD_CALLER);
                allowedRoles.add(RepRole.BOTH);
            }
        }

        return jobOfferRepository.findByActiveTrueAndRoleIn(allowedRoles)
                .stream()
                .filter(o -> o.getStatus() == JobStatus.ACTIVE)
                .map(this::mapToResponse)
                .toList();
    }

    /**
     * Listado de ofertas de una empresa (dashboard empresa).
     */
    public List<JobOfferResponse> listCompanyOffers(Long companyUserId) {

        Company company = companyRepository.findByUserId(companyUserId)
                .orElseThrow(() -> new EntityNotFoundException("Empresa no encontrada"));

        return jobOfferRepository.findByCompanyId(company.getId())
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    /**
     * Obtener una oferta por id (para detalle).
     */
    public JobOfferResponse getOffer(Long id) {
        JobOffer offer = jobOfferRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Oferta no encontrada"));
        return mapToResponse(offer);
    }

    /**
     * Pausar o cerrar oferta (empresa).
     */
    public JobOfferResponse updateStatus(Long companyUserId, Long offerId, JobStatus status) {

        Company company = companyRepository.findByUserId(companyUserId)
                .orElseThrow(() -> new EntityNotFoundException("Empresa no encontrada"));

        JobOffer offer = jobOfferRepository.findById(offerId)
                .orElseThrow(() -> new EntityNotFoundException("Oferta no encontrada"));

        if (!offer.getCompany().getId().equals(company.getId())) {
            throw new IllegalArgumentException("No puedes modificar una oferta que no es tuya");
        }

        offer.setStatus(status);
        if (status == JobStatus.CLOSED) {
            offer.setActive(false);
        }

        JobOffer saved = jobOfferRepository.save(offer);
        return mapToResponse(saved);
    }

    // -----------------------
    // Mapper sencillo MVP
    // -----------------------
    private JobOfferResponse mapToResponse(JobOffer o) {
        return JobOfferResponse.builder()
                .id(o.getId())
                .companyId(o.getCompany().getId())
                .companyName(o.getCompany().getName())
                .title(o.getTitle())
                .description(o.getDescription())
                .role(o.getRole())
                .seats(o.getSeats())
                .maxApplicants(o.getMaxApplicants())
                .applicantsCount(o.getApplicantsCount())
                .language(o.getLanguage())
                .crm(o.getCrm())
                .commissionPercent(o.getCommissionPercent())
                .avgTicket(o.getAvgTicket())
                .estimatedMonthlyEarnings(o.getEstimatedMonthlyEarnings())
                .modality(o.getModality())
                .market(o.getMarket())
                .calendlyUrl(o.getCalendlyUrl())
                .zoomUrl(o.getZoomUrl())
                .whatsappUrl(o.getWhatsappUrl())
                .status(o.getStatus())
                .active(o.getActive())
                .createdAt(o.getCreatedAt())
                .updatedAt(o.getUpdatedAt())
                .build();
    }
}

