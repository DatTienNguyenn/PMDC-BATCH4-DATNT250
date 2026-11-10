package com.carbonledger.backend.controller;

import com.carbonledger.backend.dto.budget.BudgetStatusResponse;
import com.carbonledger.backend.dto.budget.UpsertBudgetRequest;
import com.carbonledger.backend.dto.common.ApiResponse;
import com.carbonledger.backend.entity.CarbonBudget;
import com.carbonledger.backend.security.TenantContext;
import com.carbonledger.backend.service.BudgetAndAlertEngine;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@Tag(name = "Budgets", description = "Carbon budget quotas, threshold tracking and national benchmark variance")
@RestController
@RequestMapping("/api/v1/budgets")
@RequiredArgsConstructor
public class BudgetController {

    private final BudgetAndAlertEngine budgetEngine;

    @Operation(summary = "Get budget status, threshold alert and benchmark comparisons")
    @GetMapping("/status")
    public ResponseEntity<ApiResponse<BudgetStatusResponse>> getBudgetStatus(@RequestParam String period) {
        UUID workspaceId = TenantContext.getCurrentWorkspaceId();
        if (workspaceId == null) {
            return ResponseEntity.badRequest().body(ApiResponse.error("Missing X-Workspace-Id header"));
        }
        BudgetStatusResponse status = budgetEngine.evaluateBudgetStatus(workspaceId, period);
        return ResponseEntity.ok(ApiResponse.ok(status));
    }

    @Operation(summary = "Upsert monthly target carbon budget")
    @PutMapping
    public ResponseEntity<ApiResponse<CarbonBudget>> upsertBudget(@Valid @RequestBody UpsertBudgetRequest request) {
        UUID workspaceId = TenantContext.getCurrentWorkspaceId();
        if (workspaceId == null) {
            return ResponseEntity.badRequest().body(ApiResponse.error("Missing X-Workspace-Id header"));
        }
        CarbonBudget budget = budgetEngine.upsertBudget(workspaceId, request);
        return ResponseEntity.ok(ApiResponse.ok("Carbon budget updated successfully", budget));
    }
}
