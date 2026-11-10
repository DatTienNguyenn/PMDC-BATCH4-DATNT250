package com.carbonledger.backend.controller;

import com.carbonledger.backend.dto.common.ApiResponse;
import com.carbonledger.backend.entity.StandardEmissionFactor;
import com.carbonledger.backend.entity.SystemAuditLog;
import com.carbonledger.backend.service.AuditLogService;
import com.carbonledger.backend.service.MasterDataService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@Tag(name = "System Administration", description = "Privileged endpoints for System Admin (Master Data & Audit Logs)")
@RestController
@RequestMapping("/api/v1/admin")
@PreAuthorize("hasRole('SYSTEM_ADMIN')")
@RequiredArgsConstructor
public class AdminController {

    private final MasterDataService masterDataService;
    private final AuditLogService auditLogService;

    @Operation(summary = "Get list of all standard emission factors")
    @GetMapping("/emission-factors")
    public ResponseEntity<ApiResponse<List<StandardEmissionFactor>>> getFactors() {
        List<StandardEmissionFactor> factors = masterDataService.getActiveFactors();
        return ResponseEntity.ok(ApiResponse.ok(factors));
    }

    @Operation(summary = "Create or update standard emission factor")
    @PostMapping("/emission-factors")
    public ResponseEntity<ApiResponse<StandardEmissionFactor>> saveFactor(@Valid @RequestBody StandardEmissionFactor factor) {
        StandardEmissionFactor saved = masterDataService.saveFactor(factor);
        return new ResponseEntity<>(ApiResponse.ok("Emission factor saved successfully", saved), HttpStatus.CREATED);
    }

    @Operation(summary = "Deactivate emission factor")
    @DeleteMapping("/emission-factors/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteFactor(@PathVariable UUID id) {
        masterDataService.deleteFactor(id);
        return ResponseEntity.ok(ApiResponse.ok("Factor deactivated successfully", null));
    }

    @Operation(summary = "Retrieve system administration audit logs")
    @GetMapping("/audit-logs")
    public ResponseEntity<ApiResponse<List<SystemAuditLog>>> getAuditLogs() {
        List<SystemAuditLog> logs = auditLogService.getRecentLogs();
        return ResponseEntity.ok(ApiResponse.ok(logs));
    }
}
