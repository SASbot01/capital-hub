package com.capitalhub.rep.service;

import com.capitalhub.rep.entity.RepProfile;
import com.capitalhub.rep.repository.RepProfileRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RepService {

    private final RepProfileRepository repProfileRepository;

    public RepProfile getMyProfile(Long userId) {
        return repProfileRepository.findByUserId(userId)
                .orElseThrow(() -> new EntityNotFoundException("Perfil no encontrado"));
    }

    public RepProfile updateProfile(Long userId, RepProfile updates) {
        RepProfile profile = getMyProfile(userId);

        if (updates.getBio() != null) profile.setBio(updates.getBio());
        if (updates.getPhone() != null) profile.setPhone(updates.getPhone());
        if (updates.getCity() != null) profile.setCity(updates.getCity());
        if (updates.getCountry() != null) profile.setCountry(updates.getCountry());
        if (updates.getLinkedinUrl() != null) profile.setLinkedinUrl(updates.getLinkedinUrl());
        if (updates.getPortfolioUrl() != null) profile.setPortfolioUrl(updates.getPortfolioUrl());
        if (updates.getAvatarUrl() != null) profile.setAvatarUrl(updates.getAvatarUrl());
        // Agrega aquí más campos si tu entidad RepProfile los tiene (skills, experience, etc.)

        return repProfileRepository.save(profile);
    }
}