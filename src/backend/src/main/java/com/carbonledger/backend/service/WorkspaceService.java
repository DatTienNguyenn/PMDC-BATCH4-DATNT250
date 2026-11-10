package com.carbonledger.backend.service;

import com.carbonledger.backend.dto.workspace.CreateWorkspaceRequest;
import com.carbonledger.backend.dto.workspace.WorkspaceResponse;
import com.carbonledger.backend.entity.User;
import com.carbonledger.backend.entity.Workspace;
import com.carbonledger.backend.entity.WorkspaceBaseline;
import com.carbonledger.backend.entity.WorkspaceMember;
import com.carbonledger.backend.entity.enums.WorkspaceRole;
import com.carbonledger.backend.entity.enums.WorkspaceStatus;
import com.carbonledger.backend.exception.ApiException;
import com.carbonledger.backend.exception.ResourceNotFoundException;
import com.carbonledger.backend.repository.UserRepository;
import com.carbonledger.backend.repository.WorkspaceBaselineRepository;
import com.carbonledger.backend.repository.WorkspaceMemberRepository;
import com.carbonledger.backend.repository.WorkspaceRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.SecureRandom;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class WorkspaceService {

    private static final String INVITE_CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    private static final SecureRandom RANDOM = new SecureRandom();

    private final WorkspaceRepository workspaceRepository;
    private final WorkspaceMemberRepository memberRepository;
    private final WorkspaceBaselineRepository baselineRepository;
    private final UserRepository userRepository;

    @Transactional
    public WorkspaceResponse createWorkspace(CreateWorkspaceRequest request, UUID creatorUserId) {
        User creator = userRepository.findById(creatorUserId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", creatorUserId));

        String inviteCode = generateUniqueInviteCode();

        Workspace workspace = Workspace.builder()
                .name(request.getName().trim())
                .type(request.getType())
                .inviteCode(inviteCode)
                .inviteCodeExpiresAt(Instant.now().plus(30, ChronoUnit.DAYS))
                .status(WorkspaceStatus.ACTIVE)
                .build();

        Workspace savedWorkspace = workspaceRepository.save(workspace);

        // Baseline specification
        WorkspaceBaseline baseline = WorkspaceBaseline.builder()
                .workspace(savedWorkspace)
                .floorAreaM2(request.getFloorAreaM2())
                .occupants(request.getOccupants())
                .periodValidFrom("2026-01")
                .build();
        baselineRepository.save(baseline);

        // Add creator as REVIEWER
        WorkspaceMember member = WorkspaceMember.builder()
                .workspace(savedWorkspace)
                .user(creator)
                .role(WorkspaceRole.REVIEWER)
                .build();
        memberRepository.save(member);

        return WorkspaceResponse.builder()
                .id(savedWorkspace.getId())
                .name(savedWorkspace.getName())
                .type(savedWorkspace.getType())
                .inviteCode(savedWorkspace.getInviteCode())
                .status(savedWorkspace.getStatus())
                .myRole(WorkspaceRole.REVIEWER)
                .floorAreaM2(request.getFloorAreaM2())
                .occupants(request.getOccupants())
                .createdAt(savedWorkspace.getCreatedAt())
                .build();
    }

    @Transactional(readOnly = true)
    public List<WorkspaceResponse> getUserWorkspaces(UUID userId) {
        List<WorkspaceMember> memberships = memberRepository.findByUserId(userId);
        return memberships.stream().map(m -> {
            Workspace ws = m.getWorkspace();
            WorkspaceBaseline baseline = baselineRepository
                    .findFirstByWorkspaceIdOrderByPeriodValidFromDesc(ws.getId())
                    .orElse(null);

            return WorkspaceResponse.builder()
                    .id(ws.getId())
                    .name(ws.getName())
                    .type(ws.getType())
                    .inviteCode(ws.getInviteCode())
                    .status(ws.getStatus())
                    .myRole(m.getRole())
                    .floorAreaM2(baseline != null ? baseline.getFloorAreaM2() : null)
                    .occupants(baseline != null ? baseline.getOccupants() : null)
                    .createdAt(ws.getCreatedAt())
                    .build();
        }).collect(Collectors.toList());
    }

    @Transactional
    public WorkspaceResponse joinByInviteCode(String inviteCode, UUID userId) {
        Workspace workspace = workspaceRepository.findByInviteCode(inviteCode.trim().toUpperCase())
                .orElseThrow(() -> new ApiException("Invalid or expired invite code", HttpStatus.NOT_FOUND));

        if (workspace.getStatus() != WorkspaceStatus.ACTIVE) {
            throw new ApiException("Workspace is currently inactive or suspended", HttpStatus.FORBIDDEN);
        }

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));

        if (memberRepository.existsByWorkspaceIdAndUserId(workspace.getId(), userId)) {
            throw new ApiException("You are already a member of this workspace", HttpStatus.CONFLICT);
        }

        WorkspaceMember member = WorkspaceMember.builder()
                .workspace(workspace)
                .user(user)
                .role(WorkspaceRole.EDITOR)
                .build();
        memberRepository.save(member);

        WorkspaceBaseline baseline = baselineRepository
                .findFirstByWorkspaceIdOrderByPeriodValidFromDesc(workspace.getId())
                .orElse(null);

        return WorkspaceResponse.builder()
                .id(workspace.getId())
                .name(workspace.getName())
                .type(workspace.getType())
                .inviteCode(workspace.getInviteCode())
                .status(workspace.getStatus())
                .myRole(WorkspaceRole.EDITOR)
                .floorAreaM2(baseline != null ? baseline.getFloorAreaM2() : null)
                .occupants(baseline != null ? baseline.getOccupants() : null)
                .createdAt(workspace.getCreatedAt())
                .build();
    }

    private String generateUniqueInviteCode() {
        for (int attempts = 0; attempts < 10; attempts++) {
            StringBuilder sb = new StringBuilder(6);
            for (int i = 0; i < 6; i++) {
                sb.append(INVITE_CHARS.charAt(RANDOM.nextInt(INVITE_CHARS.length())));
            }
            String code = sb.toString();
            if (workspaceRepository.findByInviteCode(code).isEmpty()) {
                return code;
            }
        }
        return UUID.randomUUID().toString().substring(0, 6).toUpperCase();
    }
}
