package com.capitalhub.applications.entity;

import com.capitalhub.company.entity.Company;
import com.capitalhub.jobs.entity.JobOffer;
import com.capitalhub.rep.entity.RepProfile;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "job_applications")
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
@Builder
public class JobApplication {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "rep_id", nullable = false)
    private RepProfile rep;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "job_offer_id", nullable = false)
    private JobOffer jobOffer;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ApplicationStatus status;

    @Column(columnDefinition = "TEXT")
    private String repMessage;

    @Column(columnDefinition = "TEXT")
    private String companyNotes;

    private String interviewUrl;

    // Fechas de auditoría
    private LocalDateTime interviewAt;
    private LocalDateTime hiredAt;
    private LocalDateTime rejectedAt;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    @PrePersist
    public void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = createdAt;
        if (status == null) status = ApplicationStatus.APPLIED;
    }

    @PreUpdate
    public void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
    
    // Métodos helper de negocio
    public void markInterview(String url) {
        this.status = ApplicationStatus.INTERVIEW;
        this.interviewUrl = url;
        this.interviewAt = LocalDateTime.now();
    }
    public void markOfferSent() { this.status = ApplicationStatus.OFFER_SENT; }
    public void markHired() { 
        this.status = ApplicationStatus.HIRED; 
        this.hiredAt = LocalDateTime.now();
    }
    public void markRejected(String notes) {
        this.status = ApplicationStatus.REJECTED;
        this.companyNotes = notes;
        this.rejectedAt = LocalDateTime.now();
    }
    public void markWithdrawn() { this.status = ApplicationStatus.WITHDRAWN; }
}