package com.carbonledger.backend.entity;

import com.carbonledger.backend.entity.enums.ReportFrequency;
import com.carbonledger.backend.entity.enums.WorkspaceStatus;
import com.carbonledger.backend.entity.enums.WorkspaceType;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.Instant;
import java.time.LocalTime;
import java.util.UUID;

@Entity
@Table(name = "workspaces")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Workspace {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false, length = 100)
    private String name;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private WorkspaceType type;

    @Column(name = "invite_code", unique = true, length = 10)
    private String inviteCode;

    @Column(name = "invite_code_expires_at")
    private Instant inviteCodeExpiresAt;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    @Builder.Default
    private WorkspaceStatus status = WorkspaceStatus.ACTIVE;

    @Enumerated(EnumType.STRING)
    @Column(name = "ai_report_frequency", nullable = false, length = 20)
    @Builder.Default
    private ReportFrequency aiReportFrequency = ReportFrequency.MONTHLY;

    @Column(name = "ai_report_day_of_week")
    private Integer aiReportDayOfWeek;

    @Column(name = "ai_report_day_of_month")
    private Integer aiReportDayOfMonth;

    @Column(name = "ai_report_time", nullable = false)
    @Builder.Default
    private LocalTime aiReportTime = LocalTime.of(23, 59, 0);

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at", nullable = false)
    private Instant updatedAt;
}
