package com.carbonledger.backend.repository;

import com.carbonledger.backend.entity.AIUsageLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface AIUsageLogRepository extends JpaRepository<AIUsageLog, UUID> {
    List<AIUsageLog> findByWorkspaceIdOrderByCreatedAtDesc(UUID workspaceId);
}
