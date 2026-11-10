package com.carbonledger.backend.repository;

import com.carbonledger.backend.entity.Workspace;
import com.carbonledger.backend.entity.enums.ReportFrequency;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface WorkspaceRepository extends JpaRepository<Workspace, UUID> {
    Optional<Workspace> findByInviteCode(String inviteCode);
    List<Workspace> findByAiReportFrequency(ReportFrequency aiReportFrequency);
}
