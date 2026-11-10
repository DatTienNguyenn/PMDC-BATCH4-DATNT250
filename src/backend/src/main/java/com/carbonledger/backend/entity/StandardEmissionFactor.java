package com.carbonledger.backend.entity;

import com.carbonledger.backend.entity.enums.EmissionScope;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "standard_emission_factors")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StandardEmissionFactor {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false, length = 50)
    private String category;

    @Column(nullable = false, length = 100)
    private String subcategory;

    @Column(name = "activity_name", nullable = false, length = 150)
    private String activityName;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 10)
    private EmissionScope scope;

    @Column(name = "factor_value", nullable = false, precision = 12, scale = 6)
    private BigDecimal factorValue;

    @Column(nullable = false, length = 30)
    private String unit;

    @Column(name = "official_citation", nullable = false, length = 255)
    private String officialCitation;

    @Column(name = "valid_year", nullable = false)
    private Integer validYear;

    @Column(name = "is_active", nullable = false)
    @Builder.Default
    private Boolean isActive = true;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at", nullable = false)
    private Instant updatedAt;
}
