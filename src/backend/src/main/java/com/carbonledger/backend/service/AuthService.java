package com.carbonledger.backend.service;

import com.carbonledger.backend.dto.auth.AuthResponse;
import com.carbonledger.backend.dto.auth.LoginRequest;
import com.carbonledger.backend.dto.auth.RegisterRequest;
import com.carbonledger.backend.entity.User;
import com.carbonledger.backend.entity.enums.GlobalRole;
import com.carbonledger.backend.exception.ApiException;
import com.carbonledger.backend.exception.ResourceNotFoundException;
import com.carbonledger.backend.repository.UserRepository;
import com.carbonledger.backend.security.JwtTokenProvider;
import com.carbonledger.backend.security.UserPrincipal;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider tokenProvider;

    @Transactional
    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail().trim().toLowerCase())) {
            throw new ApiException("Email is already registered", HttpStatus.CONFLICT);
        }

        User user = User.builder()
                .email(request.getEmail().trim().toLowerCase())
                .passwordHash(passwordEncoder.encode(request.getPassword()))
                .fullName(request.getFullName().trim())
                .globalRole(GlobalRole.USER)
                .isActive(true)
                .notificationPreferences("{\"notify_budget_warning\": true, \"notify_approval_result\": true}")
                .build();

        User savedUser = userRepository.save(user);

        String token = tokenProvider.generateTokenForUser(
                savedUser.getId(),
                savedUser.getEmail(),
                savedUser.getGlobalRole().name()
        );

        return AuthResponse.builder()
                .token(token)
                .tokenType("Bearer")
                .userId(savedUser.getId())
                .email(savedUser.getEmail())
                .fullName(savedUser.getFullName())
                .globalRole(savedUser.getGlobalRole())
                .build();
    }

    @Transactional(readOnly = true)
    public AuthResponse login(LoginRequest request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail().trim().toLowerCase(),
                        request.getPassword()
                )
        );

        UserPrincipal principal = (UserPrincipal) authentication.getPrincipal();
        String token = tokenProvider.generateToken(authentication);

        return AuthResponse.builder()
                .token(token)
                .tokenType("Bearer")
                .userId(principal.getId())
                .email(principal.getEmail())
                .fullName(principal.getFullName())
                .globalRole(principal.getGlobalRole())
                .build();
    }

    @Transactional(readOnly = true)
    public User getCurrentUser(UUID userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));
    }
}
