package com.carbonledger.backend.repository;

import com.carbonledger.backend.entity.EmissionLog;
import com.carbonledger.backend.entity.enums.LogStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

@Repository
public interface EmissionLogRepository extends JpaRepository<EmissionLog, UUID>, JpaSpecificationExecutor<EmissionLog> {

    List<EmissionLog> findByWorkspaceIdOrderByActivityDateDesc(UUID workspaceId);

    List<EmissionLog> findByWorkspaceIdAndStatus(UUID workspaceId, LogStatus status);

    List<EmissionLog> findByWorkspaceIdAndBillingPeriod(UUID workspaceId, String billingPeriod);

    List<EmissionLog> findByWorkspaceIdAndBillingPeriodAndStatus(UUID workspaceId, String billingPeriod, LogStatus status);

    @Query("SELECT COALESCE(SUM(e.totalCo2eKg), 0) FROM EmissionLog e " +
           "WHERE e.workspace.id = :workspaceId AND e.billingPeriod = :billingPeriod AND e.status = :status")
    BigDecimal sumTotalCo2eByWorkspaceAndPeriodAndStatus(
            @Param("workspaceId") UUID workspaceId,
            @Param("billingPeriod") String billingPeriod,
            @Param("status") LogStatus status
    );

    @Query("SELECT e.category, SUM(e.totalCo2eKg) FROM EmissionLog e " +
           "WHERE e.workspace.id = :workspaceId AND e.billingPeriod = :billingPeriod AND e.status = :status " +
           "GROUP BY e.category")
    List<Object[]> sumByCategoryAndWorkspaceAndPeriod(
            @Param("workspaceId") UUID workspaceId,
            @Param("billingPeriod") String billingPeriod,
            @Param("status") LogStatus status
    );
}
