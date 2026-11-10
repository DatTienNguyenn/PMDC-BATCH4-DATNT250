package com.carbonledger.backend.repository;

import com.carbonledger.backend.entity.EmissionReductionPlan;
import com.carbonledger.backend.entity.enums.PlanStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface EmissionReductionPlanRepository extends JpaRepository<EmissionReductionPlan, UUID> {
    List<EmissionReductionPlan> findByWorkspaceId(UUID workspaceId);
    Optional<EmissionReductionPlan> findFirstByWorkspaceIdAndStatusOrderByCreatedAtDesc(UUID workspaceId, PlanStatus status);
}
