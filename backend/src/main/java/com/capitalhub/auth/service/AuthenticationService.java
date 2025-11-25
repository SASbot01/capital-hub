package com.capitalhub.backend.auth;

import com.capitalhub.backend.auth.dto.LoginRequest;
import com.capitalhub.backend.auth.dto.LoginResponse;
import com.capitalhub.backend.auth.dto.RefreshTokenRequest;
import com.capitalhub.backend.auth.dto.SignupRequest;
import com.capitalhub.backend.security.JwtService;
import com.capitalhub.backend.users.Role;
import com.capitalhub.backend.users.RoleRepository;
import com.capitalhub.backend.users.User;
import com.capitalhub.backend.users.UserRepository;
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
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    /**
     * Login de usuario (REP / COMPANY / ADMIN)
     */
    public LoginResponse login(LoginRequest request) {
        try {
            // Autenticar con Spring Security
            var authToken = new UsernamePasswordAuthenticationToken(
                    request.getEmail(),
                    request.getPassword()
            );
            authenticationManager.authenticate(authToken);
        } catch (Exception e) {
            throw new BadCredentialsException("Credenciales incorrectas");
        }

        // Si ha pasado la autenticación, cargamos el usuario
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new BadCredentialsException("Usuario no encontrado"));

        String roleName = user.getRole().getName();
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

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new IllegalArgumentException("Ya existe un usuario con ese email");
        }

        Role repRole = roleRepository.findByName("REP")
                .orElseThrow(() -> new IllegalStateException("Rol REP no configurado en la base de datos"));

        User user = User.builder()
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .role(repRole)
                .active(true)
                .build();

        userRepository.save(user);

        String token = jwtService.generateToken(user.getEmail(), repRole.getName());

        return LoginResponse.builder()
                .accessToken(token)
                .tokenType("Bearer")
                .email(user.getEmail())
                .role(repRole.getName())
                .build();
    }

    /**
     * Refresh sencillo: recibe un token aún válido y devuelve uno nuevo.
     * MVP: no usamos refresh tokens separados, solo reemitimos access token.
     */
    public LoginResponse refresh(RefreshTokenRequest request) {
        String oldToken = request.getToken();

        if (!jwtService.isTokenValid(oldToken)) {
            throw new BadCredentialsException("Token inválido o expirado");
        }

        String email = jwtService.getEmailFromToken(oldToken);
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new BadCredentialsException("Usuario no encontrado"));

        String roleName = user.getRole().getName();
        String newToken = jwtService.generateToken(user.getEmail(), roleName);

        return LoginResponse.builder()
                .accessToken(newToken)
                .tokenType("Bearer")
                .email(user.getEmail())
                .role(roleName)
                .build();
    }
}
