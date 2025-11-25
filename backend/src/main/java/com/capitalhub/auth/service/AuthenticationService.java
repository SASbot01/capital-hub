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
    private final RepProfileRepository repProfileRepository; // ✅ Necesario para crear el perfil
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    /**
     * Login de usuario (REP / COMPANY / ADMIN)
     */
    public LoginResponse login(LoginRequest request) {
        try {
            // Autenticar con Spring Security
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getEmail(),
                            request.getPassword()
                    )
            );
        } catch (Exception e) {
            throw new BadCredentialsException("Credenciales incorrectas");
        }

        // Si ha pasado la autenticación, cargamos el usuario
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new BadCredentialsException("Usuario no encontrado"));

        // ✅ Corregido: Role es un Enum, usamos .name()
        String roleName = user.getRole().name();
        String token = jwtService.generateToken(user.getEmail(), roleName);

        return LoginResponse.builder()
                .accessToken(token)
                .tokenType("Bearer")
                .email(user.getEmail())
                .role(roleName)
                .build();
    }

    /**
     * Registro SOLO de REP (comercial) en el MVP
     */
    public LoginResponse signupRep(SignupRequest request) {

        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new IllegalArgumentException("Ya existe un usuario con ese email");
        }

        // 1. Crear el Usuario con Role.REP
        User user = User.builder()
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .role(Role.REP) // ✅ Asignamos el Enum directamente
                .build();

        User savedUser = userRepository.save(user);

        // 2. ✅ CRÍTICO: Crear el perfil de Rep vacío asociado
        RepProfile profile = RepProfile.builder()
                .user(savedUser)
                .active(true)
                .build();
        
        repProfileRepository.save(profile);

        // 3. Generar Token
        String token = jwtService.generateToken(savedUser.getEmail(), Role.REP.name());

        return LoginResponse.builder()
                .accessToken(token)
                .tokenType("Bearer")
                .email(savedUser.getEmail())
                .role(Role.REP.name())
                .build();
    }

    /**
     * Refresh sencillo: recibe un token aún válido y devuelve uno nuevo.
     */
    public LoginResponse refresh(RefreshTokenRequest request) {
        String oldToken = request.getToken();

        // Validamos el token
        if (!jwtService.isTokenValid(oldToken)) {
            throw new BadCredentialsException("Token inválido o expirado");
        }

        String email = jwtService.getEmailFromToken(oldToken);
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new BadCredentialsException("Usuario no encontrado"));

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