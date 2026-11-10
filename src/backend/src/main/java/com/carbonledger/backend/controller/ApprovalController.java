package com.carbonledger.backend.controller;

import com.carbonledger.backend.dto.common.ApiResponse;
import com.carbonledger.backend.dto.emission.EmissionResponse;
import com.carbonledger.backend.security.TenantContext;
import com.carbonledger.backend.security.UserPrincipal;
import com.carbonledger.backend.service.ApprovalWorkflowEngine;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@Tag(name = "Approvals", description = "Review and approve/reject emission log submissions")
@RestController
@RequestMapping("/api/v1/approvals")
@RequiredArgsConstructor
public class ApprovalController {

    private final ApprovalWorkflowEngine approvalEngine;

    @Operation(summary = "Get list of pending review emission records in workspace")
    @GetMapping("/pending")
    public ResponseEntity<ApiResponse<List<EmissionResponse>>> getPendingLogs() {
        UUID workspaceId = TenantContext.getCurrentWorkspaceId();
        if (workspaceId == null) {
            return ResponseEntity.badRequest().body(ApiResponse.error("Missing X-Workspace-Id header"));
        }
        List<EmissionResponse> pending = approvalEngine.getPendingLogs(workspaceId);
        return ResponseEntity.ok(ApiResponse.ok(pending));
    }

    @Operation(summary = "Approve an emission record")
    @PostMapping("/{id}/accept")
    public ResponseEntity<ApiResponse<EmissionResponse>> acceptLog(
            @PathVariable UUID id,
            @AuthenticationPrincipal UserPrincipal principal) {
        EmissionResponse response = approvalEngine.approveLog(id, principal.getId());
        return ResponseEntity.ok(ApiResponse.ok("Emission entry approved", response));
    }

    @Operation(summary = "Reject an emission record with mandatory reason")
    @PostMapping("/{id}/reject")
    public ResponseEntity<ApiResponse<EmissionResponse>> rejectLog(
            @PathVariable UUID id,
            @RequestParam String reason,
            @AuthenticationPrincipal UserPrincipal principal) {
        EmissionResponse response = approvalEngine.rejectLog(id, principal.getId(), reason);
        return ResponseEntity.ok(ApiResponse.ok("Emission entry rejected", response));
    }
}
