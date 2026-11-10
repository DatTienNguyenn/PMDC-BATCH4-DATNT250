package com.carbonledger.backend.controller;

import com.carbonledger.backend.dto.common.ApiResponse;
import com.carbonledger.backend.dto.workspace.CreateWorkspaceRequest;
import com.carbonledger.backend.dto.workspace.WorkspaceResponse;
import com.carbonledger.backend.security.UserPrincipal;
import com.carbonledger.backend.service.WorkspaceService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "Workspaces", description = "Workspace / Tenant lifecycle and membership management")
@RestController
@RequestMapping("/api/v1/workspaces")
@RequiredArgsConstructor
public class WorkspaceController {

    private final WorkspaceService workspaceService;

    @Operation(summary = "Create a new Workspace with initial baseline")
    @PostMapping
    public ResponseEntity<ApiResponse<WorkspaceResponse>> createWorkspace(
            @Valid @RequestBody CreateWorkspaceRequest request,
            @AuthenticationPrincipal UserPrincipal principal) {
        WorkspaceResponse response = workspaceService.createWorkspace(request, principal.getId());
        return new ResponseEntity<>(ApiResponse.ok("Workspace created successfully", response), HttpStatus.CREATED);
    }

    @Operation(summary = "Get all workspaces where current user is a member")
    @GetMapping("/my-workspaces")
    public ResponseEntity<ApiResponse<List<WorkspaceResponse>>> getMyWorkspaces(
            @AuthenticationPrincipal UserPrincipal principal) {
        List<WorkspaceResponse> responses = workspaceService.getUserWorkspaces(principal.getId());
        return ResponseEntity.ok(ApiResponse.ok(responses));
    }

    @Operation(summary = "Join a workspace using 6-character invite code")
    @PostMapping("/join")
    public ResponseEntity<ApiResponse<WorkspaceResponse>> joinWorkspace(
            @RequestParam String inviteCode,
            @AuthenticationPrincipal UserPrincipal principal) {
        WorkspaceResponse response = workspaceService.joinByInviteCode(inviteCode, principal.getId());
        return ResponseEntity.ok(ApiResponse.ok("Successfully joined workspace", response));
    }
}
