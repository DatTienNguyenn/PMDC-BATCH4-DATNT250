package com.carbonledger.backend.service;

import com.carbonledger.backend.entity.AIReport;
import com.carbonledger.backend.entity.Workspace;
import com.lowagie.text.*;
import com.lowagie.text.pdf.PdfPCell;
import com.lowagie.text.pdf.PdfPTable;
import com.lowagie.text.pdf.PdfWriter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.awt.Color;
import java.io.ByteArrayOutputStream;

@Slf4j
@Service
public class PdfExportService {

    public byte[] generateReportPdf(AIReport report, Workspace workspace) {
        try (ByteArrayOutputStream baos = new ByteArrayOutputStream()) {
            Document document = new Document(PageSize.A4, 36, 36, 54, 36);
            PdfWriter.getInstance(document, baos);
            document.open();

            // Header styling
            Font titleFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 18, new Color(0, 167, 111));
            Font subTitleFont = FontFactory.getFont(FontFactory.HELVETICA, 11, Color.DARK_GRAY);
            Font sectionFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 13, new Color(33, 43, 54));
            Font bodyFont = FontFactory.getFont(FontFactory.HELVETICA, 10, Color.BLACK);

            // Document Header
            Paragraph header = new Paragraph("CARBON LEDGER - BÁO CÁO PHÁT THẢI ĐỊNH KỲ", titleFont);
            header.setAlignment(Element.ALIGN_CENTER);
            header.setSpacingAfter(4);
            document.add(header);

            Paragraph sub = new Paragraph(String.format("Không gian: %s | Kỳ báo cáo: %s | Loại: %s",
                    workspace.getName(), report.getPeriod(), report.getReportType()), subTitleFont);
            sub.setAlignment(Element.ALIGN_CENTER);
            sub.setSpacingAfter(20);
            document.add(sub);

            // KPI Overview Table
            PdfPTable kpiTable = new PdfPTable(2);
            kpiTable.setWidthPercentage(100);
            kpiTable.setSpacingAfter(15);

            PdfPCell cell1 = new PdfPCell(new Phrase("Tổng Phát Thải Trong Kỳ:\n" + report.getTotalEmissionsKg() + " kg CO2e", sectionFont));
            cell1.setBackgroundColor(new Color(244, 246, 248));
            cell1.setPadding(12);
            kpiTable.addCell(cell1);

            String variance = report.getVarianceVsLastPeriod() != null ? report.getVarianceVsLastPeriod() + "%" : "N/A";
            PdfPCell cell2 = new PdfPCell(new Phrase("Biến động so với kỳ trước:\n" + variance, sectionFont));
            cell2.setBackgroundColor(new Color(244, 246, 248));
            cell2.setPadding(12);
            kpiTable.addCell(cell2);

            document.add(kpiTable);

            // Section: Executive Summary
            document.add(new Paragraph("1. ĐÁNH GIÁ TỔNG QUAN TỪ TRỢ LÝ AI", sectionFont));
            Paragraph summaryPara = new Paragraph(report.getActionableAdviceMarkdown(), bodyFont);
            summaryPara.setSpacingBefore(6);
            summaryPara.setSpacingAfter(15);
            document.add(summaryPara);

            // Footer info
            Paragraph footer = new Paragraph("Báo cáo được khởi tạo tự động bởi Hệ thống Personal & Micro-Office Carbon Ledger.", subTitleFont);
            footer.setSpacingBefore(30);
            footer.setAlignment(Element.ALIGN_RIGHT);
            document.add(footer);

            document.close();
            return baos.toByteArray();
        } catch (Exception e) {
            log.error("Failed to generate PDF report: {}", e.getMessage(), e);
            throw new RuntimeException("Error generating PDF: " + e.getMessage(), e);
        }
    }
}
