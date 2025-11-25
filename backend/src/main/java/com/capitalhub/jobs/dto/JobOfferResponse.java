package com.capitalhub.jobs.dto;

import com.capitalhub.jobs.entity.JobStatus;
import com.capitalhub.rep.entity.RepRole;
import lombok.*;

import java.time.LocalDateTime;

@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
@Builder
public class JobOfferResponse {

    private Long id;

    private Long companyId;
    private String companyName;

    private String title;
    private String description;

    private RepRole role;

    private Integer seats;
    private Integer maxApplicants;
    private Integer applicantsCount;

    private String language;
    private String crm;

    private Double commissionPercent;
    private Double avgTicket;
    private Double estimatedMonthlyEarnings;

    private String modality;
    private String market;

    private String calendlyUrl;
    private String zoomUrl;
    private String whatsappUrl;

    private JobStatus status;
    private Boolean active;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
