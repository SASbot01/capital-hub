package com.capitalhub.applications.entity;

import com.capitalhub.jobs.entity.JobOffer;
import com.capitalhub.rep.entity.RepProfile;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(
        name = "job_applications",
        uniqueConstraints = {
                @UniqueConstraint(name = "uk_rep_job", columnNames = {"rep_id", "job_offer_id"})
        },
        indexes = {
                @Index(name = "idx_app_status", columnList = "status"),
                @Index(name = "idx_app_job", columnList = "job_offer_id"),
                @Index(name = "idx_app_rep", columnList = "rep_id")
        }
)
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
@Builder
public class JobApplication {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Oferta a la que aplica el rep
    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "job_offer_id", nullable = false)
    private JobOffer jobOffer;

    // Rep que aplica
    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "rep_id", nullable = false)
    private RepProfile rep;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private ApplicationStatus status;

    // Notas internas de empresa (no las ve el rep si no quieres)
    @Column(length = 1500)
    private String companyNotes;

    // Notas del rep al aplicar (opcional)
    @Column(length = 1000)
    private String repMessage;

    // Link de entrevista reservado (si la empresa lo usa)
    @Column(length = 300)
    private String interviewUrl;

    // Timestamps por estado (MVP útil para tracking)
    private LocalDateTime appliedAt;
    private LocalDateTime interviewAt;
    private LocalDateTime offerSentAt;
    private LocalDateTime hiredAt;
    private LocalDateTime rejectedAt;
    private LocalDateTime withdrawnAt;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    @PrePersist
    public void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = createdAt;

        if (status == null) {
            status = ApplicationStatus.APPLIED;
        }

        if (appliedAt == null) {
            appliedAt = LocalDateTime.now();
        }
    }

    @PreUpdate
    public void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

    // Helpers simples para cambiar estado en services
    public void markInterview(String interviewUrl) {
        this.status = ApplicationStatus.INTERVIEW;
        this.interviewUrl = interviewUrl;
        this.interviewAt = LocalDateTime.now();
    }

    public void markOfferSent() {
        this.status = ApplicationStatus.OFFER_SENT;
        this.offerSentAt = LocalDateTime.now();
    }

    public void markHired() {
        this.status = ApplicationStatus.HIRED;
        this.hiredAt = LocalDateTime.now();
    }

    public void markRejected(String notes) {
        this.status = ApplicationStatus.REJECTED;
        this.companyNotes = notes;
        this.rejectedAt = LocalDateTime.now();
    }

    public void markWithdrawn() {
        this.status = ApplicationStatus.WITHDRAWN;
        this.withdrawnAt = LocalDateTime.now();
    }
}
