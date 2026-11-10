package com.carbonledger.backend.controller;

import com.carbonledger.backend.dto.common.ApiResponse;
import com.carbonledger.backend.entity.AIReport;
import com.carbonledger.backend.entity.Workspace;
import com.carbonledger.backend.entity.enums.ReportType;
import com.carbonledger.backend.exception.ResourceNotFoundException;
import com.carbonledger.backend.repository.AIReportRepository;
import com.carbonledger.backend.repository.WorkspaceRepository;
import com.carbonledger.backend.security.TenantContext;
import com.carbonledger.backend.service.AIInsightService;
import com.carbonledger.backend.service.PdfExportService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@Tag(name = "AI Reports", description = "AI-powered emission insights, recommendations and PDF export")
@RestController
@RequestMapping("/api/v1/reports")
@RequiredArgsConstructor
public class AIReportController {

    private final AIInsightService aiInsightService;
    private final AIReportRepository reportRepository;
    private final WorkspaceRepository workspaceRepository;
    private final PdfExportService pdfExportService;

    @Operation(summary = "Get the latest generated AI report for workspace")
    @GetMapping("/current")
    public ResponseEntity<ApiResponse<AIReport>> getCurrentReport() {
        UUID workspaceId = TenantContext.getCurrentWorkspaceId();
        if (workspaceId == null) {
            return ResponseEntity.badRequest().body(ApiResponse.error("Missing X-Workspace-Id header"));
        }
        AIReport report = reportRepository.findFirstByWorkspaceIdOrderByGeneratedAtDesc(workspaceId)
                .orElse(null);
        return ResponseEntity.ok(ApiResponse.ok(report));
    }

    @Operation(summary = "Generate AI carbon report on demand")
    @PostMapping("/generate")
    public ResponseEntity<ApiResponse<AIReport>> generateReport(
            @RequestParam String period,
            @RequestParam(defaultValue = "MONTHLY") ReportType type) {
        UUID workspaceId = TenantContext.getCurrentWorkspaceId();
        if (workspaceId == null) {
            return ResponseEntity.badRequest().body(ApiResponse.error("Missing X-Workspace-Id header"));
        }
        AIReport report = aiInsightService.generateReportForWorkspace(workspaceId, period, type);
        return ResponseEntity.ok(ApiResponse.ok("AI Report generated successfully", report));
    }

    @Operation(summary = "Export AI carbon report to PDF document")
    @GetMapping("/{id}/export-pdf")
    public ResponseEntity<byte[]> exportPdf(@PathVariable UUID id) {
        AIReport report = reportRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("AIReport", "id", id));

        Workspace workspace = workspaceRepository.findById(report.getWorkspace().getId())
                .orElseThrow(() -> new ResourceNotFoundException("Workspace", "id", report.getWorkspace().getId()));

        byte[] pdfBytes = pdfExportService.generateReportPdf(report, workspace);

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"carbon_report_" + report.getPeriod() + ".pdf\"")
                .contentType(MediaType.APPLICATION_PDF)
                .body(pdfBytes);
    }
}
