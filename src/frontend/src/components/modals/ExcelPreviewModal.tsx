import React, { useState } from 'react';
import { useLedger } from '../../context/LedgerContext';
import { useAuth } from '../../context/AuthContext';
import { X, Check, FileSpreadsheet, CheckCircle2 } from 'lucide-react';

interface ExcelPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ExcelPreviewModal: React.FC<ExcelPreviewModalProps> = ({ isOpen, onClose }) => {
  const { addEmissionLog } = useLedger();
  const { workspaceRole } = useAuth();

  const previewRows = [
    {
      date: '2026-11-01',
      category: 'TRANSPORT',
      activityName: 'Đổ xăng xe máy Wave Alpha',
      quantity: 4.5,
      unit: 'Lít',
      factorApplied: 2.31,
      co2e: 10.4,
      valid: true,
    },
    {
      date: '2026-11-03',
      category: 'ELECTRICITY',
      activityName: 'Điện chiếu sáng hành lang',
      quantity: 18.0,
      unit: 'kWh',
      factorApplied: 0.7221,
      co2e: 13.0,
      valid: true,
    },
    {
      date: '2026-11-05',
      category: 'WATER',
      activityName: 'Nước sinh hoạt tầng 2',
      quantity: 8.0,
      unit: 'm³',
      factorApplied: 0.316,
      co2e: 2.53,
      valid: true,
    },
    {
      date: '2026-11-06',
      category: 'WASTE',
      activityName: 'Rác hữu cơ ủ phân sinh học',
      quantity: 12.0,
      unit: 'kg',
      factorApplied: 0.45,
      co2e: 5.4,
      valid: true,
    },
  ];

  if (!isOpen) return null;

  const totalCo2e = previewRows.reduce((sum, r) => sum + r.co2e, 0);
  const isReviewer = workspaceRole === 'REVIEWER';

  const handleImport = () => {
    previewRows.forEach((row) => {
      addEmissionLog({
        category: row.category as any,
        activityName: row.activityName,
        quantity: row.quantity,
        unit: row.unit,
        factorApplied: row.factorApplied,
        date: row.date,
        source: 'EXCEL',
        notes: 'Nạp hàng loạt qua file mẫu Excel',
      });
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/40 backdrop-blur-xs" onClick={onClose} />

      <div className="relative bg-white rounded-2xl shadow-2xl border border-gray-200 w-full max-w-3xl overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-[#00A76F]">
              <FileSpreadsheet className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-gray-900">
                Xác thực & Xem trước Nạp File Excel (SCR-EXCEL-PREVIEW-01)
              </h3>
              <p className="text-xs text-gray-500">
                File: <span className="font-mono text-gray-800">carbon_november_batch.xlsx</span> (4 bản ghi hợp lệ)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between bg-gray-50 px-4 py-3 rounded-xl border border-gray-200">
            <div className="flex items-center gap-2 text-xs font-semibold text-gray-700">
              <CheckCircle2 className="w-4 h-4 text-[#00A76F]" />
              <span>4/4 dòng hợp lệ (100% dữ liệu đạt chuẩn)</span>
            </div>
            <div className="text-xs text-gray-600">
              Tổng phát thải đợt nạp:{' '}
              <span className="font-bold text-[#00A76F] text-sm">
                ≈ {totalCo2e.toFixed(2)} kg CO2e
              </span>
            </div>
          </div>

          <div className="overflow-x-auto rounded-xl border border-gray-200">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50 text-gray-600 uppercase font-bold border-b border-gray-200">
                <tr>
                  <th className="py-2.5 px-3">Ngày</th>
                  <th className="py-2.5 px-3">Hoạt động</th>
                  <th className="py-2.5 px-3">Sản lượng</th>
                  <th className="py-2.5 px-3">Hệ số</th>
                  <th className="py-2.5 px-3 text-right">Quy đổi</th>
                  <th className="py-2.5 px-3 text-center">Kiểm tra</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-medium">
                {previewRows.map((row, i) => (
                  <tr key={i} className="hover:bg-gray-50/80">
                    <td className="py-2 px-3 font-mono text-gray-600">{row.date}</td>
                    <td className="py-2 px-3 text-gray-900 font-semibold">{row.activityName}</td>
                    <td className="py-2 px-3">
                      {row.quantity} {row.unit}
                    </td>
                    <td className="py-2 px-3 text-gray-500">{row.factorApplied}</td>
                    <td className="py-2 px-3 text-right font-bold text-[#00A76F]">
                      {row.co2e.toFixed(2)} kg
                    </td>
                    <td className="py-2 px-3 text-center">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-[#00A76F]">
                        Hợp lệ
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-100 rounded-xl transition-colors"
            >
              Hủy bỏ
            </button>
            <button
              type="button"
              onClick={handleImport}
              className="px-5 py-2 text-sm font-semibold text-white bg-[#00A76F] hover:bg-[#00925f] rounded-xl shadow-sm transition-all flex items-center gap-1.5"
            >
              <Check className="w-4 h-4" />
              <span>{isReviewer ? 'Xác nhận Nạp & Ghi sổ cái' : 'Gửi 4 yêu cầu duyệt'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
