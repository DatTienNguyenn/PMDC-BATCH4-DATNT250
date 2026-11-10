package com.carbonledger.backend.repository;

import com.carbonledger.backend.entity.AIReport;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface AIReportRepository extends JpaRepository<AIReport, UUID> {
    List<AIReport> findByWorkspaceIdOrderByGeneratedAtDesc(UUID workspaceId);
    Optional<AIReport> findByWorkspaceIdAndPeriod(UUID workspaceId, String period);
    Optional<AIReport> findFirstByWorkspaceIdOrderByGeneratedAtDesc(UUID workspaceId);
}
