package com.carbonledger.backend.dto.budget;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UpsertBudgetRequest {

    @NotBlank(message = "Billing period is required (YYYY-MM)")
    private String billingPeriod;

    @NotNull(message = "Target CO2e kg is required")
    @DecimalMin(value = "0.01", message = "Target must be greater than 0")
    private BigDecimal targetCo2eKg;

    @Builder.Default
    private BigDecimal warningThresholdPercent = new BigDecimal("85.00");
}
