package com.carbonledger.backend.dto.common;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;
import java.util.Map;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ErrorResponse {

    private String type;
    private String title;
    private int status;
    private String detail;
    private String instance;
    private Map<String, String> errors;

    @Builder.Default
    private Instant timestamp = Instant.now();
}
