package com.carbonledger.backend.service;

import com.carbonledger.backend.dto.emission.EmissionResponse;
import com.carbonledger.backend.entity.EmissionLog;
import com.carbonledger.backend.entity.User;
import com.carbonledger.backend.entity.enums.LogStatus;
import com.carbonledger.backend.exception.BusinessRuleException;
import com.carbonledger.backend.exception.ResourceNotFoundException;
import com.carbonledger.backend.repository.EmissionLogRepository;
import com.carbonledger.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class ApprovalWorkflowEngine {

    private final EmissionLogRepository emissionLogRepository;
    private final UserRepository userRepository;
    private final BudgetAndAlertEngine budgetAndAlertEngine;

    @Transactional(readOnly = true)
    public List<EmissionResponse> getPendingLogs(UUID workspaceId) {
        return emissionLogRepository.findByWorkspaceIdAndStatus(workspaceId, LogStatus.PENDING_REVIEW)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Transactional
    public EmissionResponse approveLog(UUID logId, UUID reviewerId) {
        EmissionLog emissionLog = emissionLogRepository.findById(logId)
                .orElseThrow(() -> new ResourceNotFoundException("EmissionLog", "id", logId));

        if (emissionLog.getStatus() == LogStatus.APPROVED) {
            throw new BusinessRuleException("Log record has already been approved");
        }

        User reviewer = userRepository.findById(reviewerId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", reviewerId));

        emissionLog.setStatus(LogStatus.APPROVED);
        emissionLog.setReviewedBy(reviewer);
        emissionLog.setReviewedAt(Instant.now());
        emissionLog.setRejectionReason(null);

        EmissionLog saved = emissionLogRepository.save(emissionLog);

        // Evaluate budget alert immediately following approval
        budgetAndAlertEngine.evaluateBudgetStatus(saved.getWorkspace().getId(), saved.getBillingPeriod());

        return mapToResponse(saved);
    }

    @Transactional
    public EmissionResponse rejectLog(UUID logId, UUID reviewerId, String rejectionReason) {
        if (rejectionReason == null || rejectionReason.isBlank()) {
            throw new BusinessRuleException("Rejection reason is mandatory when rejecting emission log");
        }

        EmissionLog emissionLog = emissionLogRepository.findById(logId)
                .orElseThrow(() -> new ResourceNotFoundException("EmissionLog", "id", logId));

        User reviewer = userRepository.findById(reviewerId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", reviewerId));

        emissionLog.setStatus(LogStatus.REJECTED);
        emissionLog.setReviewedBy(reviewer);
        emissionLog.setReviewedAt(Instant.now());
        emissionLog.setRejectionReason(rejectionReason.trim());

        EmissionLog saved = emissionLogRepository.save(emissionLog);
        return mapToResponse(saved);
    }

    private EmissionResponse mapToResponse(EmissionLog log) {
        return EmissionResponse.builder()
                .id(log.getId())
                .workspaceId(log.getWorkspace().getId())
                .activityDate(log.getActivityDate())
                .billingPeriod(log.getBillingPeriod())
                .category(log.getCategory())
                .consumptionQuantity(log.getConsumptionQuantity())
                .consumptionUnit(log.getConsumptionUnit())
                .factorApplied(log.getFactorApplied())
                .totalCo2eKg(log.getTotalCo2eKg())
                .ingestionSource(log.getIngestionSource())
                .status(log.getStatus())
                .createdBy(log.getCreatedBy().getId())
                .createdByName(log.getCreatedBy().getFullName())
                .reviewedBy(log.getReviewedBy() != null ? log.getReviewedBy().getId() : null)
                .rejectionReason(log.getRejectionReason())
                .receiptImageUrl(log.getReceiptImageUrl())
                .note(log.getNote())
                .createdAt(log.getCreatedAt())
                .build();
    }
}
