package com.capitalhub.backend.company;

import com.capitalhub.backend.users.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CompanyRepository extends JpaRepository<Company, Long> {

    Optional<Company> findByUser(User user);

    Optional<Company> findByUserId(Long userId);
}
