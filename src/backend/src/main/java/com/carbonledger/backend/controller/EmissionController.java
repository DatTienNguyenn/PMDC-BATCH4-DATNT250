package com.carbonledger.backend.controller;

import com.carbonledger.backend.dto.common.ApiResponse;
import com.carbonledger.backend.dto.emission.CreateEmissionRequest;
import com.carbonledger.backend.dto.emission.EmissionResponse;
import com.carbonledger.backend.dto.emission.ExcelImportPreviewDTO;
import com.carbonledger.backend.entity.EmissionLog;
import com.carbonledger.backend.entity.StandardEmissionFactor;
import com.carbonledger.backend.entity.User;
import com.carbonledger.backend.entity.Workspace;
import com.carbonledger.backend.entity.enums.LogStatus;
import com.carbonledger.backend.entity.enums.WorkspaceRole;
import com.carbonledger.backend.exception.ResourceNotFoundException;
import com.carbonledger.backend.repository.EmissionLogRepository;
import com.carbonledger.backend.repository.UserRepository;
import com.carbonledger.backend.repository.WorkspaceMemberRepository;
import com.carbonledger.backend.repository.WorkspaceRepository;
import com.carbonledger.backend.security.TenantContext;
import com.carbonledger.backend.security.UserPrincipal;
import com.carbonledger.backend.service.EmissionCalculationEngine;
import com.carbonledger.backend.service.ExcelProcessingEngine;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Tag(name = "Emissions", description = "Carbon ledger entries and batch Excel ingestion")
@RestController
@RequestMapping("/api/v1/emissions")
@RequiredArgsConstructor
public class EmissionController {

    private final EmissionLogRepository emissionLogRepository;
    private final WorkspaceRepository workspaceRepository;
    private final UserRepository userRepository;
    private final WorkspaceMemberRepository memberRepository;
    private final EmissionCalculationEngine calculationEngine;
    private final ExcelProcessingEngine excelProcessingEngine;

    @Operation(summary = "Submit manual carbon emission entry")
    @PostMapping
    public ResponseEntity<ApiResponse<EmissionResponse>> createEmission(
            @Valid @RequestBody CreateEmissionRequest request,
            @AuthenticationPrincipal UserPrincipal principal) {
        UUID workspaceId = TenantContext.getCurrentWorkspaceId();
        if (workspaceId == null) {
            return ResponseEntity.badRequest().body(ApiResponse.error("Missing X-Workspace-Id header"));
        }

        Workspace workspace = workspaceRepository.findById(workspaceId)
                .orElseThrow(() -> new ResourceNotFoundException("Workspace", "id", workspaceId));
        User user = userRepository.findById(principal.getId())
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", principal.getId()));

        boolean isReviewer = memberRepository.existsByWorkspaceIdAndUserIdAndRole(workspaceId, user.getId(), WorkspaceRole.REVIEWER);
        LogStatus initialStatus = isReviewer ? LogStatus.APPROVED : LogStatus.PENDING_REVIEW;

        StandardEmissionFactor factor = calculationEngine.resolveEmissionFactor(request.getCategory());
        BigDecimal totalCo2e = calculationEngine.calculateCo2e(request.getConsumptionQuantity(), factor.getFactorValue());

        EmissionLog log = EmissionLog.builder()
                .workspace(workspace)
                .createdBy(user)
                .factor(factor)
                .activityDate(request.getActivityDate())
                .billingPeriod(request.getBillingPeriod())
                .category(factor.getCategory())
                .consumptionQuantity(request.getConsumptionQuantity())
                .consumptionUnit(request.getConsumptionUnit())
                .factorApplied(factor.getFactorValue())
                .totalCo2eKg(totalCo2e)
                .ingestionSource(request.getIngestionSource())
                .status(initialStatus)
                .reviewedBy(isReviewer ? user : null)
                .reviewedAt(isReviewer ? java.time.Instant.now() : null)
                .note(request.getNote())
                .receiptImageUrl(request.getReceiptImageUrl())
                .build();

        EmissionLog saved = emissionLogRepository.save(log);

        EmissionResponse response = mapToResponse(saved);
        return new ResponseEntity<>(ApiResponse.ok("Emission entry recorded", response), HttpStatus.CREATED);
    }

    @Operation(summary = "List emission entries for current workspace")
    @GetMapping
    public ResponseEntity<ApiResponse<List<EmissionResponse>>> getEmissions() {
        UUID workspaceId = TenantContext.getCurrentWorkspaceId();
        if (workspaceId == null) {
            return ResponseEntity.badRequest().body(ApiResponse.error("Missing X-Workspace-Id header"));
        }

        List<EmissionResponse> list = emissionLogRepository.findByWorkspaceIdOrderByActivityDateDesc(workspaceId)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());

        return ResponseEntity.ok(ApiResponse.ok(list));
    }

    @Operation(summary = "Upload and preview Excel spreadsheet of emission logs")
    @PostMapping(value = "/excel-preview", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ApiResponse<ExcelImportPreviewDTO>> previewExcel(
            @RequestParam("file") MultipartFile file) {
        ExcelImportPreviewDTO preview = excelProcessingEngine.processExcelFile(file);
        return ResponseEntity.ok(ApiResponse.ok("Excel processed successfully", preview));
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
