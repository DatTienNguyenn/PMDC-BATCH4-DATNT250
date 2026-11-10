package com.carbonledger.backend.entity;

import com.carbonledger.backend.entity.enums.BenchmarkType;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "system_reference_benchmarks", uniqueConstraints = {
    @UniqueConstraint(name = "uq_ref_benchmark", columnNames = {"benchmark_type", "activity_category"})
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SystemReferenceBenchmark {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Enumerated(EnumType.STRING)
    @Column(name = "benchmark_type", nullable = false, length = 20)
    private BenchmarkType benchmarkType;

    @Column(name = "activity_category", nullable = false, length = 50)
    private String activityCategory;

    @Column(name = "per_capita_monthly_kg", nullable = false, precision = 10, scale = 4)
    private BigDecimal perCapitaMonthlyKg;

    @Column(name = "percentage_of_total", nullable = false, precision = 5, scale = 2)
    private BigDecimal percentageOfTotal;

    @Column(length = 255)
    private String description;

    @Column(name = "official_source", nullable = false, length = 255)
    private String officialSource;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at", nullable = false)
    private Instant updatedAt;
}
