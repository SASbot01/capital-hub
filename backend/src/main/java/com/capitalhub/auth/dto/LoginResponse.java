package com.capitalhub.backend.auth.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class LoginResponse {

    private String accessToken;
    private String tokenType; // "Bearer"
    private String email;
    private String role;
}
