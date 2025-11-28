package com.capitalhub.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.util.List;

@Configuration
public class CorsConfig {

    @Bean
    public CorsFilter corsFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();
        
        // Permitir credenciales (cookies, headers de auth)
        config.setAllowCredentials(true);
        
        // ⚠️ IMPORTANTE: Aquí definimos quién puede conectarse.
        // He añadido los puertos típicos de desarrollo local (Vite/React).
        config.setAllowedOrigins(List.of(
            "http://localhost:3000", 
            "http://localhost:5173",
            "http://localhost:5174"
        ));
        
        // Headers permitidos (necesario para enviar el Token "Authorization")
        config.addAllowedHeader("*");
        
        // Métodos HTTP permitidos
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"));
        
        source.registerCorsConfiguration("/**", config);
        return new CorsFilter(source);
    }
}