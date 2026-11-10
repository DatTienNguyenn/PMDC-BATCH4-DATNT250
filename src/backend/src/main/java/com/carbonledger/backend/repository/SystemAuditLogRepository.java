package com.carbonledger.backend.repository;

import com.carbonledger.backend.entity.SystemAuditLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface SystemAuditLogRepository extends JpaRepository<SystemAuditLog, UUID> {
    List<SystemAuditLog> findByAdminId(UUID adminId);
    List<SystemAuditLog> findAllByOrderByCreatedAtDesc();
}
