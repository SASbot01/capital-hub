package com.capitalhub.applications.service;

import com.capitalhub.applications.dto.ApplicationResponse;
import com.capitalhub.applications.dto.ApplyRequest;
import com.capitalhub.applications.entity.ApplicationStatus;
import com.capitalhub.applications.entity.JobApplication;
import com.capitalhub.applications.repository.JobApplicationRepository;
import com.capitalhub.company.entity.Company;
import com.capitalhub.company.repository.CompanyRepository;
import com.capitalhub.jobs.entity.JobOffer;
import com.capitalhub.jobs.entity.JobStatus;
import com.capitalhub.jobs.repository.JobOfferRepository;
import com.capitalhub.rep.entity.RepProfile;
import com.capitalhub.rep.repository.RepProfileRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class JobApplicationService {

    private final JobApplicationRepository applicationRepository;
    private final JobOfferRepository jobOfferRepository;
    private final RepProfileRepository repProfileRepository;
    private final CompanyRepository companyRepository;

    /**
     * REP aplica a una oferta.
     */
    public ApplicationResponse applyToOffer(Long repUserId, Long offerId, ApplyRequest req) {

        RepProfile rep = repProfileRepository.findByUserId(repUserId)
                .orElseThrow(() -> new EntityNotFoundException("Perfil REP no encontrado"));

        JobOffer offer = jobOfferRepository.findById(offerId)
                .orElseThrow(() -> new EntityNotFoundException("Oferta no encontrada"));

        // Validaciones
        if (!Boolean.TRUE.equals(offer.getActive()) || offer.getStatus() != JobStatus.ACTIVE) {
            throw new IllegalArgumentException("Esta oferta no está activa");
        }

        if (applicationRepository.existsByRepIdAndJobOfferId(rep.getId(), offer.getId())) {
            throw new IllegalArgumentException("Ya has aplicado a esta oferta");
        }

        if (offer.getApplicantsCount() >= offer.getMaxApplicants()) {
            throw new IllegalArgumentException("La oferta ya alcanzó el máximo de postulaciones");
        }

        // Crear aplicación
        JobApplication application = JobApplication.builder()
                .rep(rep)
                .jobOffer(offer)
                .status(ApplicationStatus.APPLIED)
                .repMessage(req != null ? req.getRepMessage() : null)
                .build();

        JobApplication saved = applicationRepository.save(application);

        // Actualizar contador en oferta
        offer.setApplicantsCount(offer.getApplicantsCount() + 1);
        jobOfferRepository.save(offer);

        return mapToResponse(saved);
    }

    /**
     * REP ve sus aplicaciones.
     */
    public List<ApplicationResponse> listMyApplications(Long repUserId) {
        RepProfile rep = repProfileRepository.findByUserId(repUserId)
                .orElseThrow(() -> new EntityNotFoundException("Perfil REP no encontrado"));

        return applicationRepository.findByRepId(rep.getId())
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    /**
     * Empresa ve aplicaciones de una oferta suya.
     */
    public List<ApplicationResponse> listApplicationsForOffer(Long companyUserId, Long offerId) {
        Company company = companyRepository.findByUserId(companyUserId)
                .orElseThrow(() -> new EntityNotFoundException("Empresa no encontrada"));

        JobOffer offer = jobOfferRepository.findById(offerId)
                .orElseThrow(() -> new EntityNotFoundException("Oferta no encontrada"));

        if (!offer.getCompany().getId().equals(company.getId())) {
            throw new IllegalArgumentException("No puedes ver aplicaciones de una oferta que no es tuya");
        }

        return applicationRepository.findByJobOfferId(offerId)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    /**
     * Empresa cambia estado de aplicación (ENTREVISTA, CONTRATADO, RECHAZADO...).
     */
    public ApplicationResponse updateApplicationStatus(
            Long companyUserId,
            Long applicationId,
            ApplicationStatus status,
            String companyNotes,
            String interviewUrl
    ) {
        Company company = companyRepository.findByUserId(companyUserId)
                .orElseThrow(() -> new EntityNotFoundException("Empresa no encontrada"));

        JobApplication app = applicationRepository.findById(applicationId)
                .orElseThrow(() -> new EntityNotFoundException("Aplicación no encontrada"));

        if (!app.getJobOffer().getCompany().getId().equals(company.getId())) {
            throw new IllegalArgumentException("No puedes modificar aplicaciones de otra empresa");
        }

        // Lógica de cambio de estado
        switch (status) {
            case INTERVIEW -> app.markInterview(interviewUrl);
            case OFFER_SENT -> app.markOfferSent();
            case HIRED -> app.markHired();
            case REJECTED -> app.markRejected(companyNotes);
            case WITHDRAWN -> app.markWithdrawn();
            default -> app.setStatus(ApplicationStatus.APPLIED);
        }

        if (companyNotes != null) {
            app.setCompanyNotes(companyNotes);
        }

        JobApplication saved = applicationRepository.save(app);
        return mapToResponse(saved);
    }

    // Mapper manual (Entity -> DTO)
    private ApplicationResponse mapToResponse(JobApplication a) {
        JobOffer o = a.getJobOffer();
        RepProfile r = a.getRep();

        return ApplicationResponse.builder()
                .id(a.getId())
                .jobOfferId(o.getId())
                .jobTitle(o.getTitle())
                .jobRole(o.getRole().name())
                .companyId(o.getCompany().getId())
                .companyName(o.getCompany().getName())
                .repId(r.getId())
                .repFullName(r.getFullName())
                .status(a.getStatus())
                .repMessage(a.getRepMessage())
                .companyNotes(a.getCompanyNotes())
                .interviewUrl(a.getInterviewUrl())
                .appliedAt(a.getAppliedAt())
                .interviewAt(a.getInterviewAt())
                .hiredAt(a.getHiredAt())
                .rejectedAt(a.getRejectedAt())
                .createdAt(a.getCreatedAt())
                .updatedAt(a.getUpdatedAt())
                .build();
    }
}