package com.capitalhub.rep.controller;

import com.capitalhub.auth.entity.User;
import com.capitalhub.rep.entity.RepProfile;
import com.capitalhub.rep.service.RepService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping("/api/rep")
@RequiredArgsConstructor
public class RepController {

    private final RepService repService;

    @GetMapping("/me")
    @PreAuthorize("hasRole('REP')")
    public ResponseEntity<RepProfile> getMyProfile(Principal principal) {
        Long userId = extractUserId(principal);
        return ResponseEntity.ok(repService.getMyProfile(userId));
    }

    @PutMapping("/me")
    @PreAuthorize("hasRole('REP')")
    public ResponseEntity<RepProfile> updateProfile(@RequestBody RepProfile updates, Principal principal) {
        Long userId = extractUserId(principal);
        return ResponseEntity.ok(repService.updateProfile(userId, updates));
    }

    private Long extractUserId(Principal principal) {
        if (principal instanceof User user) {
            return user.getId();
        }
        throw new IllegalStateException("Usuario no autenticado");
    }
}