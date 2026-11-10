package com.carbonledger.backend.dto.budget;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BudgetStatusResponse {

    private String billingPeriod;
    private BigDecimal targetCo2eKg;
    private BigDecimal actualCo2eKg;
    private BigDecimal utilizationPercent;
    private BigDecimal warningThresholdPercent;
    private String alertStatus; // NORMAL, WARNING, EXCEEDED
    private BigDecimal perCapitaActualKg;
    private BigDecimal nationalBenchmarkPerCapitaKg;
    private Integer occupants;
}
