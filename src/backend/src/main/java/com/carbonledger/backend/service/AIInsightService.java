package com.carbonledger.backend.service;

import com.carbonledger.backend.entity.AIReport;
import com.carbonledger.backend.entity.Workspace;
import com.carbonledger.backend.entity.enums.LogStatus;
import com.carbonledger.backend.entity.enums.ReportFrequency;
import com.carbonledger.backend.entity.enums.ReportType;
import com.carbonledger.backend.exception.ResourceNotFoundException;
import com.carbonledger.backend.repository.AIReportRepository;
import com.carbonledger.backend.repository.EmissionLogRepository;
import com.carbonledger.backend.repository.WorkspaceRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class AIInsightService {

    private final AIReportRepository reportRepository;
    private final EmissionLogRepository emissionLogRepository;
    private final WorkspaceRepository workspaceRepository;
    private final GeminiClient geminiClient;
    private final ObjectMapper objectMapper;

    @Transactional
    public AIReport generateReportForWorkspace(UUID workspaceId, String period, ReportType reportType) {
        Workspace workspace = workspaceRepository.findById(workspaceId)
                .orElseThrow(() -> new ResourceNotFoundException("Workspace", "id", workspaceId));

        BigDecimal totalEmissions = emissionLogRepository.sumTotalCo2eByWorkspaceAndPeriodAndStatus(
                workspaceId, period, LogStatus.APPROVED
        );
        if (totalEmissions == null) {
            totalEmissions = BigDecimal.ZERO;
        }

        List<Object[]> categorySums = emissionLogRepository.sumByCategoryAndWorkspaceAndPeriod(
                workspaceId, period, LogStatus.APPROVED
        );

        Map<String, BigDecimal> breakdownMap = new HashMap<>();
        for (Object[] row : categorySums) {
            String cat = (String) row[0];
            BigDecimal sum = (BigDecimal) row[1];
            breakdownMap.put(cat, sum);
        }

        String breakdownJson;
        try {
            breakdownJson = objectMapper.writeValueAsString(breakdownMap);
        } catch (Exception e) {
            breakdownJson = "{}";
        }

        String prompt = "You are a professional Carbon Footprint Auditor. Analyze the carbon ledger figures for this workspace and generate actionable energy-saving and carbon reduction advice.";
        String context = String.format("Workspace: %s, Period: %s, Total CO2e: %s kg, Breakdown: %s",
                workspace.getName(), period, totalEmissions, breakdownJson);

        String aiAnalysisResult = geminiClient.generateStructuredAnalysis(prompt, context);

        AIReport report = AIReport.builder()
                .workspace(workspace)
                .reportType(reportType)
                .period(period)
                .totalEmissionsKg(totalEmissions)
                .varianceVsLastPeriod(BigDecimal.ZERO)
                .breakdownByCategory(breakdownJson)
                .actionableAdviceMarkdown(aiAnalysisResult)
                .build();

        return reportRepository.save(report);
    }

    @Scheduled(cron = "0 59 23 * * ?") // Daily check at 23:59:00
    public void executeScheduledAIReportGeneration() {
        log.info("Scanning workspaces for scheduled AI Carbon Report generation...");
        List<Workspace> weeklyWorkspaces = workspaceRepository.findByAiReportFrequency(ReportFrequency.WEEKLY);
        List<Workspace> monthlyWorkspaces = workspaceRepository.findByAiReportFrequency(ReportFrequency.MONTHLY);

        String currentMonthPeriod = LocalDate.now().format(DateTimeFormatter.ofPattern("yyyy-MM"));

        for (Workspace ws : monthlyWorkspaces) {
            try {
                if (reportRepository.findByWorkspaceIdAndPeriod(ws.getId(), currentMonthPeriod).isEmpty()) {
                    generateReportForWorkspace(ws.getId(), currentMonthPeriod, ReportType.MONTHLY);
                    log.info("Automated monthly AI report generated for workspace {}", ws.getId());
                }
            } catch (Exception e) {
                log.error("Failed to execute scheduled AI report for workspace {}: {}", ws.getId(), e.getMessage());
            }
        }
    }
}
