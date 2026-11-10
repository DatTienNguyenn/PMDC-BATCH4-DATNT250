package com.carbonledger.backend.security;

import com.carbonledger.backend.repository.WorkspaceMemberRepository;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.mock.web.MockHttpServletResponse;

import java.io.IOException;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.verify;

@ExtendWith(MockitoExtension.class)
class TenantContextFilterTest {

    @Mock
    private WorkspaceMemberRepository workspaceMemberRepository;
    @Mock
    private FilterChain filterChain;

    private TenantContextFilter tenantContextFilter;

    @BeforeEach
    void setUp() {
        tenantContextFilter = new TenantContextFilter(workspaceMemberRepository);
        TenantContext.clear();
    }

    @AfterEach
    void tearDown() {
        TenantContext.clear();
    }

    @Test
    @DisplayName("Should populate TenantContext when valid X-Workspace-Id header is passed and clear after execution")
    void testTenantContextPopulationAndCleanup() throws ServletException, IOException {
        UUID expectedId = UUID.randomUUID();
        MockHttpServletRequest request = new MockHttpServletRequest();
        request.addHeader(TenantContextFilter.TENANT_HEADER, expectedId.toString());
        MockHttpServletResponse response = new MockHttpServletResponse();

        tenantContextFilter.doFilter(request, response, (req, res) -> {
            // Within filter chain execution: context must be set
            assertThat(TenantContext.getCurrentWorkspaceId()).isEqualTo(expectedId);
        });

        // After filter chain execution: context must be cleared
        assertThat(TenantContext.getCurrentWorkspaceId()).isNull();
    }
}
