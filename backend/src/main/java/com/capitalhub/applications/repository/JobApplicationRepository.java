package com.capitalhub.applications.repository;

import com.capitalhub.applications.entity.JobApplication;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface JobApplicationRepository extends JpaRepository<JobApplication, Long> {
    List<JobApplication> findByRepId(Long repId);
    List<JobApplication> findByJobOfferId(Long jobOfferId);
    
    // ✅ NUEVO: Buscar todas las aplicaciones de una empresa (a través de la oferta)
    List<JobApplication> findByJobOffer_CompanyId(Long companyId);
    
    boolean existsByRepIdAndJobOfferId(Long repId, Long jobOfferId);
}