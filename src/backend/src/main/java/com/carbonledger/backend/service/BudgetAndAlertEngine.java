package com.carbonledger.backend.service;

import com.carbonledger.backend.dto.budget.BudgetStatusResponse;
import com.carbonledger.backend.dto.budget.UpsertBudgetRequest;
import com.carbonledger.backend.entity.CarbonBudget;
import com.carbonledger.backend.entity.Workspace;
import com.carbonledger.backend.entity.WorkspaceBaseline;
import com.carbonledger.backend.entity.enums.BenchmarkType;
import com.carbonledger.backend.entity.enums.LogStatus;
import com.carbonledger.backend.entity.enums.WorkspaceType;
import com.carbonledger.backend.exception.ResourceNotFoundException;
import com.carbonledger.backend.repository.CarbonBudgetRepository;
import com.carbonledger.backend.repository.EmissionLogRepository;
import com.carbonledger.backend.repository.WorkspaceBaselineRepository;
import com.carbonledger.backend.repository.WorkspaceRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class BudgetAndAlertEngine {

    public static final BigDecimal HOUSEHOLD_BENCHMARK_KG = new BigDecimal("155.2500");
    public static final BigDecimal WORKPLACE_BENCHMARK_KG = new BigDecimal("305.8300");

    private final CarbonBudgetRepository carbonBudgetRepository;
    private final EmissionLogRepository emissionLogRepository;
    private final WorkspaceBaselineRepository baselineRepository;
    private final WorkspaceRepository workspaceRepository;

    @Transactional(readOnly = true)
    public BudgetStatusResponse evaluateBudgetStatus(UUID workspaceId, String billingPeriod) {
        Workspace workspace = workspaceRepository.findById(workspaceId)
                .orElseThrow(() -> new ResourceNotFoundException("Workspace", "id", workspaceId));

        CarbonBudget budget = carbonBudgetRepository.findByWorkspaceIdAndBillingPeriod(workspaceId, billingPeriod)
                .orElse(null);

        BigDecimal targetCo2eKg = (budget != null) ? budget.getTargetCo2eKg() : BigDecimal.ZERO;
        BigDecimal warningThreshold = (budget != null) ? budget.getWarningThresholdPercent() : new BigDecimal("85.00");

        BigDecimal actualCo2eKg = emissionLogRepository.sumTotalCo2eByWorkspaceAndPeriodAndStatus(
                workspaceId, billingPeriod, LogStatus.APPROVED
        );
        if (actualCo2eKg == null) {
            actualCo2eKg = BigDecimal.ZERO;
        }

        BigDecimal utilizationPercent = BigDecimal.ZERO;
        if (targetCo2eKg.compareTo(BigDecimal.ZERO) > 0) {
            utilizationPercent = actualCo2eKg
                    .multiply(BigDecimal.valueOf(100))
                    .divide(targetCo2eKg, 2, RoundingMode.HALF_UP);
        }

        String alertStatus = "NORMAL";
        if (targetCo2eKg.compareTo(BigDecimal.ZERO) > 0) {
            if (utilizationPercent.compareTo(BigDecimal.valueOf(100)) >= 0) {
                alertStatus = "EXCEEDED";
            } else if (utilizationPercent.compareTo(warningThreshold) >= 0) {
                alertStatus = "WARNING";
            }
        }

        WorkspaceBaseline baseline = baselineRepository.findFirstByWorkspaceIdOrderByPeriodValidFromDesc(workspaceId)
                .orElse(null);
        int occupants = (baseline != null && baseline.getOccupants() != null) ? baseline.getOccupants() : 1;

        BigDecimal perCapitaActual = actualCo2eKg.divide(BigDecimal.valueOf(occupants), 2, RoundingMode.HALF_UP);

        BigDecimal benchmarkKg = (workspace.getType() == WorkspaceType.HOME || workspace.getType() == WorkspaceType.HOUSEHOLD)
                ? HOUSEHOLD_BENCHMARK_KG
                : WORKPLACE_BENCHMARK_KG;

        return BudgetStatusResponse.builder()
                .billingPeriod(billingPeriod)
                .targetCo2eKg(targetCo2eKg)
                .actualCo2eKg(actualCo2eKg)
                .utilizationPercent(utilizationPercent)
                .warningThresholdPercent(warningThreshold)
                .alertStatus(alertStatus)
                .perCapitaActualKg(perCapitaActual)
                .nationalBenchmarkPerCapitaKg(benchmarkKg)
                .occupants(occupants)
                .build();
    }

    @Transactional
    public CarbonBudget upsertBudget(UUID workspaceId, UpsertBudgetRequest request) {
        Workspace workspace = workspaceRepository.findById(workspaceId)
                .orElseThrow(() -> new ResourceNotFoundException("Workspace", "id", workspaceId));

        CarbonBudget budget = carbonBudgetRepository
                .findByWorkspaceIdAndBillingPeriod(workspaceId, request.getBillingPeriod())
                .orElse(CarbonBudget.builder()
                        .workspace(workspace)
                        .billingPeriod(request.getBillingPeriod())
                        .build());

        budget.setTargetCo2eKg(request.getTargetCo2eKg());
        if (request.getWarningThresholdPercent() != null) {
            budget.setWarningThresholdPercent(request.getWarningThresholdPercent());
        }

        return carbonBudgetRepository.save(budget);
    }
}
