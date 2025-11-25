package com.capitalhub.auth.controller;

import com.capitalhub.auth.dto.LoginRequest;
import com.capitalhub.auth.dto.LoginResponse;
import com.capitalhub.auth.dto.RefreshTokenRequest;
import com.capitalhub.auth.dto.SignupRequest;
import com.capitalhub.auth.service.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationService authenticationService;

    // LOGIN (Para Reps y Empresas)
    // POST /api/auth/login
    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest request) {
        return ResponseEntity.ok(authenticationService.login(request));
    }

    // REGISTRO DE REPS (Setter/Closer)
    // POST /api/auth/signup/rep
    @PostMapping("/signup/rep")
    public ResponseEntity<LoginResponse> signupRep(@RequestBody SignupRequest request) {
        return ResponseEntity.ok(authenticationService.signupRep(request));
    }

    // REFRESH TOKEN (Para mantener la sesión viva)
    // POST /api/auth/refresh
    @PostMapping("/refresh")
    public ResponseEntity<LoginResponse> refresh(@RequestBody RefreshTokenRequest request) {
        return ResponseEntity.ok(authenticationService.refresh(request));
    }
}
