package com.capitalhub.company.entity;

import com.capitalhub.auth.entity.User;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "companies")
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
@Builder
public class Company {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Empresa propietaria (usuario con rol COMPANY)
    @OneToOne(optional = false)
    @JoinColumn(name = "user_id", unique = true, nullable = false)
    private User user;

    @Column(nullable = false, length = 120)
    private String name;

    @Column(length = 200)
    private String website;

    @Column(length = 100)
    private String industry; 
    // MVP: string simple. Luego lo cambiamos a CatalogIndustry (FK)

    @Column(length = 1000)
    private String description;

    // Métricas/inputs del dashboard empresa (MVP básico)
    private Integer monthlyRevenue;      // ingresos mensuales aproximados
    private Integer monthlyCalls;        // llamadas realizadas en el mes
    private Integer monthlyClosedDeals;  // cierres mensuales
    private Double winRate;              // % efectividad

    // Video de oferta / Loom (link)
    @Column(length = 300)
    private String offerVideoUrl;

    // Integraciones (guardamos links simples en MVP)
    @Column(length = 300)
    private String calendlyUrl;

    @Column(length = 300)
    private String zoomUrl;

    @Column(length = 300)
    private String whatsappUrl;

    @Column(nullable = false)
    private Boolean active = true;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    @PrePersist
    public void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = createdAt;
        if (active == null) active = true;
    }

    @PreUpdate
    public void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
