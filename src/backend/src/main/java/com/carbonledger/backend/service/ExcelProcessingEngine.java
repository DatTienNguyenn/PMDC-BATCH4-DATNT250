package com.carbonledger.backend.service;

import com.carbonledger.backend.dto.emission.ExcelImportPreviewDTO;
import com.carbonledger.backend.dto.emission.ExcelRowResult;
import com.carbonledger.backend.entity.StandardEmissionFactor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.poi.ss.usermodel.*;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class ExcelProcessingEngine {

    private final EmissionCalculationEngine calculationEngine;

    public ExcelImportPreviewDTO processExcelFile(MultipartFile file) {
        List<ExcelRowResult> validRows = new ArrayList<>();
        List<ExcelRowResult> invalidRows = new ArrayList<>();

        try (InputStream is = file.getInputStream();
             Workbook workbook = WorkbookFactory.create(is)) {

            Sheet sheet = workbook.getSheetAt(0);
            int rowIdx = 0;

            for (Row row : sheet) {
                rowIdx++;
                if (rowIdx == 1) {
                    // Skip header row
                    continue;
                }

                if (isRowEmpty(row)) {
                    continue;
                }

                ExcelRowResult result = processRow(row, rowIdx);
                if (result.isValid()) {
                    validRows.add(result);
                } else {
                    invalidRows.add(result);
                }
            }
        } catch (Exception e) {
            log.error("Error reading Excel spreadsheet: {}", e.getMessage(), e);
            invalidRows.add(ExcelRowResult.builder()
                    .rowNumber(1)
                    .valid(false)
                    .errorMessage("Failed to read Excel workbook: " + e.getMessage())
                    .build());
        }

        return ExcelImportPreviewDTO.builder()
                .totalRows(validRows.size() + invalidRows.size())
                .validCount(validRows.size())
                .invalidCount(invalidRows.size())
                .validRows(validRows)
                .invalidRows(invalidRows)
                .build();
    }

    private ExcelRowResult processRow(Row row, int rowIdx) {
        try {
            // Column 0: Activity Date
            LocalDate activityDate = parseDateCell(row.getCell(0));
            if (activityDate == null) {
                return buildInvalidRow(rowIdx, "Invalid or missing activity date in Column A");
            }

            // Column 1: Category
            String category = parseStringCell(row.getCell(1));
            if (category == null || category.isBlank()) {
                return buildInvalidRow(rowIdx, "Missing emission category in Column B");
            }

            // Column 2: Consumption Quantity
            BigDecimal quantity = parseNumericCell(row.getCell(2));
            if (quantity == null || quantity.compareTo(BigDecimal.ZERO) <= 0) {
                return buildInvalidRow(rowIdx, "Consumption quantity must be a positive number in Column C");
            }

            // Column 3: Unit
            String unit = parseStringCell(row.getCell(3));
            if (unit == null || unit.isBlank()) {
                return buildInvalidRow(rowIdx, "Missing consumption unit in Column D");
            }

            // Look up Factor & calculate projected CO2e
            StandardEmissionFactor factor;
            try {
                factor = calculationEngine.resolveEmissionFactor(category.trim());
            } catch (Exception e) {
                return buildInvalidRow(rowIdx, "Unknown emission category: " + category);
            }

            BigDecimal factorValue = factor.getFactorValue();
            BigDecimal calculatedCo2e = calculationEngine.calculateCo2e(quantity, factorValue);

            return ExcelRowResult.builder()
                    .rowNumber(rowIdx)
                    .valid(true)
                    .activityDate(activityDate)
                    .category(factor.getCategory())
                    .consumptionQuantity(quantity.setScale(4, RoundingMode.HALF_UP))
                    .consumptionUnit(unit.trim())
                    .factorApplied(factorValue)
                    .calculatedCo2eKg(calculatedCo2e)
                    .build();

        } catch (Exception e) {
            return buildInvalidRow(rowIdx, "Row parsing exception: " + e.getMessage());
        }
    }

    private ExcelRowResult buildInvalidRow(int rowNumber, String errorMessage) {
        return ExcelRowResult.builder()
                .rowNumber(rowNumber)
                .valid(false)
                .errorMessage(errorMessage)
                .build();
    }

    private LocalDate parseDateCell(Cell cell) {
        if (cell == null) return null;
        if (cell.getCellType() == CellType.NUMERIC && DateUtil.isCellDateFormatted(cell)) {
            Date date = cell.getDateCellValue();
            return date.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
        }
        if (cell.getCellType() == CellType.STRING) {
            String val = cell.getStringCellValue().trim();
            try {
                return LocalDate.parse(val, DateTimeFormatter.ISO_LOCAL_DATE);
            } catch (Exception ignored) {
                try {
                    return LocalDate.parse(val, DateTimeFormatter.ofPattern("dd/MM/yyyy"));
                } catch (Exception ex) {
                    return null;
                }
            }
        }
        return null;
    }

    private String parseStringCell(Cell cell) {
        if (cell == null) return null;
        if (cell.getCellType() == CellType.STRING) {
            return cell.getStringCellValue().trim();
        }
        if (cell.getCellType() == CellType.NUMERIC) {
            return String.valueOf((long) cell.getNumericCellValue());
        }
        return null;
    }

    private BigDecimal parseNumericCell(Cell cell) {
        if (cell == null) return null;
        if (cell.getCellType() == CellType.NUMERIC) {
            return BigDecimal.valueOf(cell.getNumericCellValue());
        }
        if (cell.getCellType() == CellType.STRING) {
            try {
                return new BigDecimal(cell.getStringCellValue().trim().replace(",", ""));
            } catch (NumberFormatException e) {
                return null;
            }
        }
        return null;
    }

    private boolean isRowEmpty(Row row) {
        if (row == null) return true;
        for (int c = row.getFirstCellNum(); c < row.getLastCellNum(); c++) {
            Cell cell = row.getCell(c);
            if (cell != null && cell.getCellType() != CellType.BLANK) {
                return false;
            }
        }
        return true;
    }
}
