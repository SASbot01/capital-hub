package com.capitalhub.company.repository;

import com.capitalhub.auth.entity.User;
import com.capitalhub.company.entity.Company;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CompanyRepository extends JpaRepository<Company, Long> {

    // Buscar empresa por el objeto User completo
    Optional<Company> findByUser(User user);

    // Buscar empresa directamente por el ID del usuario (muy útil para los Servicios)
    Optional<Company> findByUserId(Long userId);
}