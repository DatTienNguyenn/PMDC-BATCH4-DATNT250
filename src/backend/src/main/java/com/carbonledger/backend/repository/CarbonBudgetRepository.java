package com.carbonledger.backend.repository;

import com.carbonledger.backend.entity.CarbonBudget;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface CarbonBudgetRepository extends JpaRepository<CarbonBudget, UUID> {
    Optional<CarbonBudget> findByWorkspaceIdAndBillingPeriod(UUID workspaceId, String billingPeriod);
    List<CarbonBudget> findByWorkspaceIdOrderByBillingPeriodDesc(UUID workspaceId);
}
