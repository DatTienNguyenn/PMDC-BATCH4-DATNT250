package com.carbonledger.backend.security;

import com.carbonledger.backend.entity.enums.WorkspaceRole;
import com.carbonledger.backend.repository.WorkspaceMemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Component("workspaceSecurity")
@RequiredArgsConstructor
public class WorkspaceSecurity {

    private final WorkspaceMemberRepository workspaceMemberRepository;

    public boolean hasRole(UUID workspaceId, String requiredRole) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || !(auth.getPrincipal() instanceof UserPrincipal principal)) {
            return false;
        }

        if (principal.getAuthorities().stream().anyMatch(a -> a.getAuthority().equals("ROLE_SYSTEM_ADMIN"))) {
            return true;
        }

        try {
            WorkspaceRole role = WorkspaceRole.valueOf(requiredRole.toUpperCase());
            return workspaceMemberRepository.existsByWorkspaceIdAndUserIdAndRole(workspaceId, principal.getId(), role);
        } catch (IllegalArgumentException e) {
            return false;
        }
    }

    public boolean isReviewer(UUID workspaceId) {
        return hasRole(workspaceId, "REVIEWER");
    }

    public boolean hasAccess(Authentication authentication, UUID workspaceId) {
        if (authentication == null || !(authentication.getPrincipal() instanceof UserPrincipal principal)) {
            return false;
        }

        if (principal.getAuthorities().stream().anyMatch(a -> a.getAuthority().equals("ROLE_SYSTEM_ADMIN"))) {
            return true;
        }

        return workspaceMemberRepository.existsByWorkspaceIdAndUserId(workspaceId, principal.getId());
    }
}
