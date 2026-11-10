package com.carbonledger.backend.dto.emission;

import com.carbonledger.backend.entity.enums.IngestionSource;
import com.carbonledger.backend.entity.enums.LogStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDate;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EmissionResponse {

    private UUID id;
    private UUID workspaceId;
    private LocalDate activityDate;
    private String billingPeriod;
    private String category;
    private BigDecimal consumptionQuantity;
    private String consumptionUnit;
    private BigDecimal factorApplied;
    private BigDecimal totalCo2eKg;
    private IngestionSource ingestionSource;
    private LogStatus status;
    private UUID createdBy;
    private String createdByName;
    private UUID reviewedBy;
    private String rejectionReason;
    private String receiptImageUrl;
    private String note;
    private Instant createdAt;
}
