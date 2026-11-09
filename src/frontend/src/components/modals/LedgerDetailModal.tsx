import React from 'react';
import { EmissionLog } from '../../types';
import { X, CheckCircle2, AlertCircle, Clock, ShieldCheck, Trash2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLedger } from '../../context/LedgerContext';

interface LedgerDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  log: EmissionLog | null;
}

export const LedgerDetailModal: React.FC<LedgerDetailModalProps> = ({
  isOpen,
  onClose,
  log,
}) => {
  const { workspaceRole } = useAuth();
  const { deleteLog } = useLedger();

  if (!isOpen || !log) return null;

  const isApproved = log.status === 'APPROVED';
  const isDraft = log.status === 'DRAFT';
  const isRejected = log.status === 'REJECTED';

  const handleDelete = () => {
    if (confirm('Bạn có chắc chắn muốn xóa bản ghi phát thải này?')) {
      deleteLog(log.id);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/40 backdrop-blur-xs" onClick={onClose} />

      <div className="relative bg-white rounded-2xl shadow-2xl border border-gray-200 w-full max-w-lg overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-gray-900">
              Chi tiết Bản ghi Phát thải (SCR-LEDGER-DETAIL-01)
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          {/* Main Card Header */}
          <div className="flex items-start justify-between">
            <div>
              <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                {log.category} • {log.date}
              </div>
              <h4 className="text-lg font-bold text-gray-900">{log.activityName}</h4>
              <div className="text-xs text-gray-500 mt-1">
                Người ghi nhận: <span className="font-semibold text-gray-800">{log.userName}</span>
              </div>
            </div>

            {/* Status Badge */}
            <div>
              {isApproved && (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-[#00A76F] border border-emerald-200">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Đã duyệt (Ghi sổ)
                </span>
              )}
              {isDraft && (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200">
                  <Clock className="w-3.5 h-3.5" />
                  Chờ duyệt (Draft)
                </span>
              )}
              {isRejected && (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-red-50 text-red-600 border border-red-200">
                  <AlertCircle className="w-3.5 h-3.5" />
                  Bị từ chối
                </span>
              )}
            </div>
          </div>

          {/* Quantitative Metrics Box */}
          <div className="grid grid-cols-2 gap-3 p-4 bg-gray-50 rounded-xl border border-gray-200 text-xs">
            <div>
              <span className="text-gray-400 block mb-0.5">Sản lượng tiêu thụ:</span>
              <span className="text-sm font-bold text-gray-900">
                {log.quantity} {log.unit}
              </span>
            </div>
            <div>
              <span className="text-gray-400 block mb-0.5">Hệ số áp dụng:</span>
              <span className="text-sm font-semibold text-gray-800">
                {log.factorApplied} kg CO2e/{log.unit}
              </span>
            </div>
            <div className="col-span-2 pt-2 border-t border-gray-200 flex items-center justify-between">
              <span className="text-gray-500 font-semibold">Tổng dấu chân Carbon:</span>
              <span className="text-base font-extrabold text-[#00A76F]">
                ≈ {log.co2e.toFixed(2)} kg CO2e
              </span>
            </div>
          </div>

          {/* Audit Trail & Approval Trace */}
          <div className="space-y-2 border-t border-gray-100 pt-3 text-xs">
            <h5 className="font-bold text-gray-900 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#00A76F]" />
              Vết kiểm toán & Phê duyệt (Audit Trail)
            </h5>
            <div className="space-y-1.5 text-gray-600">
              <div className="flex justify-between">
                <span>Phương thức nạp:</span>
                <span className="font-semibold text-gray-800">
                  {log.source === 'MANUAL'
                    ? 'Khai báo Thủ công'
                    : log.source === 'EXCEL'
                    ? 'Nạp file Excel Template'
                    : 'Multimodal AI Vision'}
                </span>
              </div>
              {log.reviewerName && (
                <div className="flex justify-between">
                  <span>Người phê duyệt:</span>
                  <span className="font-semibold text-gray-800">{log.reviewerName}</span>
                </div>
              )}
              {log.reviewedAt && (
                <div className="flex justify-between">
                  <span>Thời điểm duyệt:</span>
                  <span className="font-mono text-gray-700">
                    {new Date(log.reviewedAt).toLocaleString('vi-VN')}
                  </span>
                </div>
              )}
              {log.rejectReason && (
                <div className="p-2.5 rounded-lg bg-red-50 text-red-700 border border-red-200 mt-2">
                  <span className="font-bold block mb-0.5">Lý do từ chối:</span>
                  {log.rejectReason}
                </div>
              )}
              {log.notes && (
                <div className="p-2.5 rounded-lg bg-gray-50 text-gray-700 border border-gray-200 mt-1">
                  <span className="font-semibold block mb-0.5 text-gray-500">Ghi chú:</span>
                  {log.notes}
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between pt-3 border-t border-gray-100">
            {workspaceRole === 'REVIEWER' ? (
              <button
                onClick={handleDelete}
                className="text-xs font-semibold text-red-600 hover:text-red-700 flex items-center gap-1 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Xóa bản ghi
              </button>
            ) : (
              <div />
            )}
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 font-semibold rounded-xl text-gray-700 text-xs transition-colors"
            >
              Đóng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
