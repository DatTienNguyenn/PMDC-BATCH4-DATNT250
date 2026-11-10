package com.carbonledger.backend.service;

import com.carbonledger.backend.dto.budget.BudgetStatusResponse;
import com.carbonledger.backend.entity.CarbonBudget;
import com.carbonledger.backend.entity.Workspace;
import com.carbonledger.backend.entity.WorkspaceBaseline;
import com.carbonledger.backend.entity.enums.LogStatus;
import com.carbonledger.backend.entity.enums.WorkspaceType;
import com.carbonledger.backend.repository.CarbonBudgetRepository;
import com.carbonledger.backend.repository.EmissionLogRepository;
import com.carbonledger.backend.repository.WorkspaceBaselineRepository;
import com.carbonledger.backend.repository.WorkspaceRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.util.Optional;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class BudgetAndAlertEngineTest {

    @Mock
    private CarbonBudgetRepository carbonBudgetRepository;
    @Mock
    private EmissionLogRepository emissionLogRepository;
    @Mock
    private WorkspaceBaselineRepository baselineRepository;
    @Mock
    private WorkspaceRepository workspaceRepository;

    private BudgetAndAlertEngine budgetEngine;

    @BeforeEach
    void setUp() {
        budgetEngine = new BudgetAndAlertEngine(
                carbonBudgetRepository,
                emissionLogRepository,
                baselineRepository,
                workspaceRepository
        );
    }

    @Test
    @DisplayName("Should detect WARNING status when consumption reaches 85% of budget target")
    void testBudgetStatusWarningThreshold() {
        UUID workspaceId = UUID.randomUUID();
        String period = "2026-10";

        Workspace workspace = Workspace.builder().id(workspaceId).type(WorkspaceType.HOUSEHOLD).build();
        CarbonBudget budget = CarbonBudget.builder()
                .targetCo2eKg(new BigDecimal("100.00"))
                .warningThresholdPercent(new BigDecimal("85.00"))
                .build();
        WorkspaceBaseline baseline = WorkspaceBaseline.builder().occupants(2).build();

        when(workspaceRepository.findById(workspaceId)).thenReturn(Optional.of(workspace));
        when(carbonBudgetRepository.findByWorkspaceIdAndBillingPeriod(workspaceId, period)).thenReturn(Optional.of(budget));
        when(emissionLogRepository.sumTotalCo2eByWorkspaceAndPeriodAndStatus(workspaceId, period, LogStatus.APPROVED))
                .thenReturn(new BigDecimal("88.00"));
        when(baselineRepository.findFirstByWorkspaceIdOrderByPeriodValidFromDesc(workspaceId))
                .thenReturn(Optional.of(baseline));

        BudgetStatusResponse response = budgetEngine.evaluateBudgetStatus(workspaceId, period);

        assertThat(response.getAlertStatus()).isEqualTo("WARNING");
        assertThat(response.getUtilizationPercent()).isEqualByComparingTo(new BigDecimal("88.00"));
        assertThat(response.getPerCapitaActualKg()).isEqualByComparingTo(new BigDecimal("44.00"));
        assertThat(response.getNationalBenchmarkPerCapitaKg()).isEqualByComparingTo(BudgetAndAlertEngine.HOUSEHOLD_BENCHMARK_KG);
    }

    @Test
    @DisplayName("Should detect EXCEEDED status when consumption reaches or exceeds 100% of budget target")
    void testBudgetStatusExceededThreshold() {
        UUID workspaceId = UUID.randomUUID();
        String period = "2026-10";

        Workspace workspace = Workspace.builder().id(workspaceId).type(WorkspaceType.HOUSEHOLD).build();
        CarbonBudget budget = CarbonBudget.builder()
                .targetCo2eKg(new BigDecimal("100.00"))
                .warningThresholdPercent(new BigDecimal("85.00"))
                .build();

        when(workspaceRepository.findById(workspaceId)).thenReturn(Optional.of(workspace));
        when(carbonBudgetRepository.findByWorkspaceIdAndBillingPeriod(workspaceId, period)).thenReturn(Optional.of(budget));
        when(emissionLogRepository.sumTotalCo2eByWorkspaceAndPeriodAndStatus(workspaceId, period, LogStatus.APPROVED))
                .thenReturn(new BigDecimal("105.50"));
        when(baselineRepository.findFirstByWorkspaceIdOrderByPeriodValidFromDesc(workspaceId))
                .thenReturn(Optional.empty());

        BudgetStatusResponse response = budgetEngine.evaluateBudgetStatus(workspaceId, period);

        assertThat(response.getAlertStatus()).isEqualTo("EXCEEDED");
        assertThat(response.getUtilizationPercent()).isEqualByComparingTo(new BigDecimal("105.50"));
    }
}
