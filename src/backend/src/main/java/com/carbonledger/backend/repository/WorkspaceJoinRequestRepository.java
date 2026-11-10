package com.carbonledger.backend.repository;

import com.carbonledger.backend.entity.WorkspaceJoinRequest;
import com.carbonledger.backend.entity.enums.JoinRequestStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface WorkspaceJoinRequestRepository extends JpaRepository<WorkspaceJoinRequest, UUID> {
    List<WorkspaceJoinRequest> findByWorkspaceId(UUID workspaceId);
    List<WorkspaceJoinRequest> findByWorkspaceIdAndStatus(UUID workspaceId, JoinRequestStatus status);
    List<WorkspaceJoinRequest> findByUserId(UUID userId);
}
