package com.carbonledger.backend.entity;

import com.carbonledger.backend.entity.enums.IngestionSource;
import com.carbonledger.backend.entity.enums.LogStatus;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDate;
import java.util.UUID;

@Entity
@Table(name = "emission_logs")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EmissionLog {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "workspace_id", nullable = false)
    private Workspace workspace;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "created_by", nullable = false)
    private User createdBy;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "factor_id", nullable = false)
    private StandardEmissionFactor factor;

    @Column(name = "activity_date", nullable = false)
    private LocalDate activityDate;

    @Column(name = "billing_period", nullable = false, length = 7)
    private String billingPeriod;

    @Column(nullable = false, length = 50)
    private String category;

    @Column(name = "consumption_quantity", nullable = false, precision = 12, scale = 4)
    private BigDecimal consumptionQuantity;

    @Column(name = "consumption_unit", nullable = false, length = 30)
    private String consumptionUnit;

    @Column(name = "factor_applied", nullable = false, precision = 12, scale = 6)
    private BigDecimal factorApplied;

    @Column(name = "total_co2e_kg", nullable = false, precision = 12, scale = 2)
    private BigDecimal totalCo2eKg;

    @Enumerated(EnumType.STRING)
    @Column(name = "ingestion_source", nullable = false, length = 20)
    private IngestionSource ingestionSource;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    @Builder.Default
    private LogStatus status = LogStatus.PENDING_REVIEW;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "reviewed_by")
    private User reviewedBy;

    @Column(name = "reviewed_at")
    private Instant reviewedAt;

    @Column(name = "rejection_reason", length = 255)
    private String rejectionReason;

    @Column(name = "receipt_image_url", length = 500)
    private String receiptImageUrl;

    @Column(length = 255)
    private String note;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at", nullable = false)
    private Instant updatedAt;
}
