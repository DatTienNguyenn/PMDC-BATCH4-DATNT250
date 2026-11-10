package com.carbonledger.backend.security;

import com.carbonledger.backend.repository.WorkspaceMemberRepository;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.UUID;

@Slf4j
@Component
@RequiredArgsConstructor
public class TenantContextFilter extends OncePerRequestFilter {

    public static final String TENANT_HEADER = "X-Workspace-Id";
    private final WorkspaceMemberRepository workspaceMemberRepository;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {
        String tenantHeader = request.getHeader(TENANT_HEADER);

        if (StringUtils.hasText(tenantHeader)) {
            try {
                UUID workspaceId = UUID.fromString(tenantHeader.trim());
                TenantContext.setCurrentWorkspaceId(workspaceId);

                Authentication auth = SecurityContextHolder.getContext().getAuthentication();
                if (auth != null && auth.getPrincipal() instanceof UserPrincipal principal) {
                    boolean isAdmin = principal.getAuthorities().stream()
                            .anyMatch(a -> a.getAuthority().equals("ROLE_SYSTEM_ADMIN"));

                    if (!isAdmin) {
                        boolean isMember = workspaceMemberRepository.existsByWorkspaceIdAndUserId(workspaceId, principal.getId());
                        if (!isMember) {
                            log.warn("User {} attempted unauthorized access to workspace {}", principal.getId(), workspaceId);
                            response.sendError(HttpServletResponse.SC_FORBIDDEN, "Access denied to workspace " + workspaceId);
                            return;
                        }
                    }
                }
            } catch (IllegalArgumentException e) {
                log.warn("Invalid UUID format in {} header: {}", TENANT_HEADER, tenantHeader);
                response.sendError(HttpServletResponse.SC_BAD_REQUEST, "Invalid workspace ID header format");
                return;
            }
        }

        try {
            filterChain.doFilter(request, response);
        } finally {
            TenantContext.clear();
        }
    }
}
