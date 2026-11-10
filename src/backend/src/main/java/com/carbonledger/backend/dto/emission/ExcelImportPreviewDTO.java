package com.carbonledger.backend.dto.emission;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ExcelImportPreviewDTO {

    private int totalRows;
    private int validCount;
    private int invalidCount;
    private List<ExcelRowResult> validRows;
    private List<ExcelRowResult> invalidRows;
}
