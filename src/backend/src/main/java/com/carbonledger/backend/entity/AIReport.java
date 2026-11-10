package com.carbonledger.backend.entity;

import com.carbonledger.backend.entity.enums.ReportType;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "ai_reports")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AIReport {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "workspace_id", nullable = false)
    private Workspace workspace;

    @Enumerated(EnumType.STRING)
    @Column(name = "report_type", nullable = false, length = 20)
    private ReportType reportType;

    @Column(nullable = false, length = 10)
    private String period;

    @Column(name = "total_emissions_kg", nullable = false, precision = 12, scale = 2)
    private BigDecimal totalEmissionsKg;

    @Column(name = "variance_vs_last_period", precision = 5, scale = 2)
    private BigDecimal varianceVsLastPeriod;

    @Column(name = "breakdown_by_category", nullable = false, columnDefinition = "jsonb")
    private String breakdownByCategory;

    @Column(name = "actionable_advice_markdown", nullable = false, columnDefinition = "text")
    private String actionableAdviceMarkdown;

    @Column(name = "pdf_file_url", length = 500)
    private String pdfFileUrl;

    @CreationTimestamp
    @Column(name = "generated_at", nullable = false, updatable = false)
    private Instant generatedAt;
}
