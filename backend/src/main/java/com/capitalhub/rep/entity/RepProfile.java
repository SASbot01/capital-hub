package com.capitalhub.rep.entity;

import com.capitalhub.auth.entity.User;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "rep_profiles")
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
@Builder
public class RepProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Usuario dueño del perfil (un User con rol REP)
    @OneToOne(optional = false)
    @JoinColumn(name = "user_id", unique = true)
    private User user;

    // ENUM del tipo de rol comercial
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    private RepRole role;

    @Column(nullable = false, length = 80)
    private String fullName;

    private Integer age;

    @Column(length = 1000)
    private String bio;

    // Links profesionales
    @Column(length = 300)
    private String linkedinUrl;

    @Column(length = 300)
    private String portfolioUrl;

    @Column(length = 300)
    private String presentationVideoUrl;

    // Métricas importantes para matching
    private Integer monthlyCalls;       // llamadas al mes
    private Integer closedDeals;        // cierres logrados
    private Double winRate;             // ratio de cierres
    private Double avgTicket;           // ticket medio
    private Double pipelineValue;       // valor del pipeline

    // Media y archivos subidos
    @Column(length = 300)
    private String photoUrl;

    @Column(length = 300)
    private String cvUrl;

    @Column(length = 300)
    private String bestCallsFolderUrl; // carpeta MinIO con audios o vídeos

    // Verificación por ADMIN
    private Boolean verified = false;

    // Disponibilidad para entrevistas
    @Column(length = 300)
    private String calendlyUrl;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    @PrePersist
    public void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = createdAt;
        if (verified == null) verified = false;
    }

    @PreUpdate
    public void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
