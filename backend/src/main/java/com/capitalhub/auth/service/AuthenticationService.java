package com.capitalhub.auth.service;

import com.capitalhub.auth.dto.LoginRequest;
import com.capitalhub.auth.dto.LoginResponse;
import com.capitalhub.auth.dto.RefreshTokenRequest;
import com.capitalhub.auth.dto.SignupRequest;
import com.capitalhub.auth.entity.Role;
import com.capitalhub.auth.entity.User;
import com.capitalhub.auth.repository.UserRepository;
import com.capitalhub.config.JwtService;
import com.capitalhub.rep.entity.RepProfile;
import com.capitalhub.rep.repository.RepProfileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final RepProfileRepository repProfileRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public LoginResponse login(LoginRequest request) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getEmail(),
                            request.getPassword()
                    )
            );
        } catch (Exception e) {
            throw new BadCredentialsException("Credenciales incorrectas");
        }

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new BadCredentialsException("Usuario no encontrado"));

        // ✅ CORREGIDO: .name() en lugar de .getName()
        String roleName = user.getRole().name();
        String token = jwtService.generateToken(user.getEmail(), roleName);

        return LoginResponse.builder()
                .accessToken(token)
                .tokenType("Bearer")
                .email(user.getEmail())
                .role(roleName)
                .build();
    }

    public LoginResponse signupRep(SignupRequest request) {
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new IllegalArgumentException("Ya existe un usuario con ese email");
        }

        User user = User.builder()
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .role(Role.REP)
                .build();

        User savedUser = userRepository.save(user);

        RepProfile profile = RepProfile.builder()
                .user(savedUser)
                .active(true)
                .build();
        
        repProfileRepository.save(profile);

        // ✅ CORREGIDO: .name()
        String token = jwtService.generateToken(savedUser.getEmail(), Role.REP.name());

        return LoginResponse.builder()
                .accessToken(token)
                .tokenType("Bearer")
                .email(savedUser.getEmail())
                .role(Role.REP.name())
                .build();
    }

    public LoginResponse refresh(RefreshTokenRequest request) {
        String oldToken = request.getToken();

        if (!jwtService.isTokenValid(oldToken)) {
            throw new BadCredentialsException("Token inválido o expirado");
        }

        String email = jwtService.getEmailFromToken(oldToken);
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new BadCredentialsException("Usuario no encontrado"));

        // ✅ CORREGIDO: .name()
        String roleName = user.getRole().name();
        String newToken = jwtService.generateToken(user.getEmail(), roleName);

        return LoginResponse.builder()
                .accessToken(newToken)
                .tokenType("Bearer")
                .email(user.getEmail())
                .role(roleName)
                .build();
    }
}