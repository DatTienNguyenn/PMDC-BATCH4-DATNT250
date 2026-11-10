package com.carbonledger.backend.controller;

import com.carbonledger.backend.dto.common.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.Instant;
import java.util.Map;

@Tag(name = "Health Check", description = "Public health and status inspection")
@RestController
@RequestMapping("/api/v1/health")
public class HealthController {

    @Operation(summary = "Get application health status and runtime metadata")
    @GetMapping
    public ResponseEntity<ApiResponse<Map<String, Object>>> checkHealth() {
        Map<String, Object> status = Map.of(
                "status", "UP",
                "application", "Carbon Ledger Core Backend API",
                "version", "1.0.0",
                "timestamp", Instant.now().toString()
        );
        return ResponseEntity.ok(ApiResponse.ok(status));
    }
}
