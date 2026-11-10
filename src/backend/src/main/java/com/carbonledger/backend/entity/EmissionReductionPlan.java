package com.carbonledger.backend.entity;

import com.carbonledger.backend.entity.enums.PlanStatus;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "emission_reduction_plans")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EmissionReductionPlan {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "workspace_id", nullable = false)
    private Workspace workspace;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "created_by_user_id", nullable = false)
    private User createdByUser;

    @Column(name = "baseline_period", nullable = false, length = 7)
    private String baselinePeriod;

    @Column(name = "baseline_emissions_kg", nullable = false, precision = 12, scale = 2)
    private BigDecimal baselineEmissionsKg;

    @Column(name = "target_reduction_percentage", nullable = false, precision = 5, scale = 2)
    private BigDecimal targetReductionPercentage;

    @Column(name = "target_emissions_kg", nullable = false, precision = 12, scale = 2)
    private BigDecimal targetEmissionsKg;

    @Column(name = "time_horizon_months", nullable = false)
    private Integer timeHorizonMonths;

    @Column(name = "monthly_roadmap", nullable = false, columnDefinition = "jsonb")
    private String monthlyRoadmap;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    @Builder.Default
    private PlanStatus status = PlanStatus.ACTIVE;

    @Column(name = "pdf_file_url", length = 500)
    private String pdfFileUrl;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at", nullable = false)
    private Instant updatedAt;
}
