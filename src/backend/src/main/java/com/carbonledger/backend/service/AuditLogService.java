package com.carbonledger.backend.service;

import com.carbonledger.backend.entity.SystemAuditLog;
import com.carbonledger.backend.entity.User;
import com.carbonledger.backend.repository.SystemAuditLogRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuditLogService {

    private final SystemAuditLogRepository auditLogRepository;

    @Transactional
    public void recordAction(User admin, String action, String resourceType, String resourceId, String details, String ipAddress) {
        SystemAuditLog auditLog = SystemAuditLog.builder()
                .admin(admin)
                .action(action)
                .resourceType(resourceType)
                .resourceId(resourceId)
                .details(details)
                .ipAddress(ipAddress)
                .build();

        auditLogRepository.save(auditLog);
        log.info("Audit log recorded: {} by admin {}", action, admin.getEmail());
    }

    @Transactional(readOnly = true)
    public List<SystemAuditLog> getRecentLogs() {
        return auditLogRepository.findAllByOrderByCreatedAtDesc();
    }
}
