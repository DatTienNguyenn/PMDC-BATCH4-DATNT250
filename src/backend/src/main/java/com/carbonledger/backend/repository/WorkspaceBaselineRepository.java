package com.carbonledger.backend.repository;

import com.carbonledger.backend.entity.WorkspaceBaseline;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface WorkspaceBaselineRepository extends JpaRepository<WorkspaceBaseline, UUID> {
    List<WorkspaceBaseline> findByWorkspaceId(UUID workspaceId);
    Optional<WorkspaceBaseline> findFirstByWorkspaceIdOrderByPeriodValidFromDesc(UUID workspaceId);
}
