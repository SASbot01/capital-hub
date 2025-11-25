package com.capitalhub.rep.repository;

import com.capitalhub.rep.entity.RepProfile;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RepProfileRepository extends JpaRepository<RepProfile, Long> {

    Optional<RepProfile> findByUserId(Long userId);

    boolean existsByFullNameIgnoreCase(String fullName);
}
