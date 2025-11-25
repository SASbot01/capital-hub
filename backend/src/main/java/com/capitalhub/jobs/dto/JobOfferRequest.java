package com.capitalhub.jobs.dto;

import com.capitalhub.rep.entity.RepRole;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
@Builder
public class JobOfferRequest {

    @NotBlank
    private String title;

    private String description;

    @NotNull
    private RepRole role;

    @NotNull
    @Min(1)
    private Integer seats;

    private String language;   // "ES", "EN", "ES+EN"
    private String crm;        // "HubSpot", "GoHighLevel", etc.

    private Double commissionPercent;
    private Double avgTicket;
    private Double estimatedMonthlyEarnings;

    private String modality;   // remoto/híbrido/presencial
    private String market;     // ES/LATAM/USA...

    private String calendlyUrl;
    private String zoomUrl;
    private String whatsappUrl;
}
