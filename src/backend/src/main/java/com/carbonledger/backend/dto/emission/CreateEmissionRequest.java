package com.carbonledger.backend.dto.emission;

import com.carbonledger.backend.entity.enums.IngestionSource;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
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
public class CreateEmissionRequest {

    @NotNull(message = "Activity date is required")
    private LocalDate activityDate;

    @NotBlank(message = "Billing period is required (YYYY-MM)")
    private String billingPeriod;

    @NotBlank(message = "Category is required")
    private String category;

    @NotNull(message = "Consumption quantity is required")
    @DecimalMin(value = "0.0001", message = "Consumption quantity must be greater than 0")
    private BigDecimal consumptionQuantity;

    @NotBlank(message = "Consumption unit is required")
    private String consumptionUnit;

    @Builder.Default
    private IngestionSource ingestionSource = IngestionSource.MANUAL;

    private String note;
    private String receiptImageUrl;
}
