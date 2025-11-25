package com.capitalhub.jobs.entity;

import com.capitalhub.company.entity.Company;
import com.capitalhub.rep.entity.RepRole;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "job_offers")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class JobOffer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Relación con la empresa
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "company_id", nullable = false)
    private Company company;

    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Enumerated(EnumType.STRING)
    private RepRole role; // SETTER, CLOSER...

    private Integer seats;           // Plazas totales
    private Integer maxApplicants;   // Límite de postulantes
    
    @Builder.Default
    private Integer applicantsCount = 0;

    // Detalles de la oferta
    private String language;
    private String crm;
    private Double commissionPercent;
    private Double avgTicket;
    private Double estimatedMonthlyEarnings;

    private String modality; // Remoto, Híbrido...
    private String market;   // España, Latam...

    // Links importantes
    private String calendlyUrl;
    private String zoomUrl;
    private String whatsappUrl;

    @Enumerated(EnumType.STRING)
    private JobStatus status;

    private Boolean active;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;
}