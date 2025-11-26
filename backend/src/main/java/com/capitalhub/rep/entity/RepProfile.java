package com.capitalhub.rep.entity;

import com.capitalhub.auth.entity.User;
import jakarta.persistence.*;
import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "rep_profiles")
public class RepProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Relación Uno-a-Uno con el usuario (Closer/Setter)
    @OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    private String bio;
    private String phone;
    private String city;
    private String country;
    
    private String linkedinUrl;
    private String portfolioUrl;
    private String avatarUrl;

    private Boolean active;

    /**
     * Devuelve el nombre completo del REP.
     * Esto arregla el error "cannot find symbol: method getFullName()"
     * en ReviewService y otros DTOs.
     */
    public String getFullName() {
        if (user != null) {
            return user.getFirstName() + " " + user.getLastName();
        }
        return "N/A";
    }
}