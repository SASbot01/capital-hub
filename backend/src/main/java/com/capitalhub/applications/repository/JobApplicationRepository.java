package com.capitalhub.applications.repository;

import com.capitalhub.applications.entity.ApplicationStatus;
import com.capitalhub.applications.entity.JobApplication;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface JobApplicationRepository extends JpaRepository<JobApplication, Long> {

    // Todas las aplicaciones de un rep
    List<JobApplication> findByRepId(Long repId);

    // Todas las aplicaciones a una oferta
    List<JobApplication> findByJobOfferId(Long jobOfferId);

    // Filtrar por estado y oferta
    List<JobApplication> findByJobOfferIdAndStatus(Long jobOfferId, ApplicationStatus status);

    // Saber si un rep ya aplicó a esa oferta (para validar)
    Optional<JobApplication> findByRepIdAndJobOfferId(Long repId, Long jobOfferId);

    boolean existsByRepIdAndJobOfferId(Long repId, Long jobOfferId);
}
