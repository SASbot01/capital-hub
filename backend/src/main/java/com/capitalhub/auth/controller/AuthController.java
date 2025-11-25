package com.capitalhub.backend.auth;

import com.capitalhub.backend.auth.dto.LoginRequest;
import com.capitalhub.backend.auth.dto.LoginResponse;
import com.capitalhub.backend.auth.dto.RefreshTokenRequest;
import com.capitalhub.backend.auth.dto.SignupRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000") // Frontend local
public class AuthController {

    private final AuthenticationService authenticationService;

    /**
     * Login de cualquier usuario (ADMIN / COMPANY / REP)
     */
    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@Valid @RequestBody LoginRequest request) {
        LoginResponse response = authenticationService.login(request);
        return ResponseEntity.ok(response);
    }

    /**
     * Registro de REP (comercial) para el MVP
     */
    @PostMapping("/signup/rep")
    public ResponseEntity<LoginResponse> signupRep(@Valid @RequestBody SignupRequest request) {
        LoginResponse response = authenticationService.signupRep(request);
        return ResponseEntity.ok(response);
    }

    /**
     * Refresh de token sencillo (sin refresh token separado en MVP)
     */
    @PostMapping("/refresh")
    public ResponseEntity<LoginResponse> refresh(@Valid @RequestBody RefreshTokenRequest request) {
        LoginResponse response = authenticationService.refresh(request);
        return ResponseEntity.ok(response);
    }
}
