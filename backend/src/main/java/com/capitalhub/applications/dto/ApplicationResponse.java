package com.capitalhub.applications.dto;

import com.capitalhub.applications.entity.ApplicationStatus;
import lombok.*;

import java.time.LocalDateTime;

@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
@Builder
public class ApplicationResponse {

    private Long id;

    private Long jobOfferId;
    private String jobTitle;
    private String jobRole;

    private Long companyId;
    private String companyName;

    private Long repId;
    private String repFullName;

    private ApplicationStatus status;

    private String repMessage;
    private String companyNotes;
    private String interviewUrl;

    private LocalDateTime appliedAt;
    private LocalDateTime interviewAt;
    private LocalDateTime hiredAt;
    private LocalDateTime rejectedAt;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
