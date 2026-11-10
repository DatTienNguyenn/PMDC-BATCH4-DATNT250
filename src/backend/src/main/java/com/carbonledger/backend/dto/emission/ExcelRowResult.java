package com.carbonledger.backend.dto.emission;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ExcelRowResult {

    private int rowNumber;
    private boolean valid;
    private LocalDate activityDate;
    private String category;
    private BigDecimal consumptionQuantity;
    private String consumptionUnit;
    private BigDecimal factorApplied;
    private BigDecimal calculatedCo2eKg;
    private String errorMessage;
}
