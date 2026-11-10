import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLedger } from '../../context/LedgerContext';
import { RejectReasonModal } from '../../components/modals/RejectReasonModal';
import { EmissionLog } from '../../types';
import { Check, X, Clock, ShieldAlert, CheckCircle2, AlertCircle, FileText } from 'lucide-react';
import { Navigate } from 'react-router-dom';

export const ApprovalQueuePage: React.FC = () => {
  const { workspaceRole } = useAuth();
  const { logs, approveLog, rejectLog } = useLedger();

  const [selectedLogForReject, setSelectedLogForReject] = useState<EmissionLog | null>(null);

  // RBAC Guard: Member (Editor) cannot access Approval Queue
  if (workspaceRole !== 'REVIEWER') {
    return <Navigate to="/403" replace />;
  }

  const pendingLogs = logs.filter((l) => l.status === 'DRAFT');

  const handleApprove = (id: string) => {
    approveLog(id);
  };

  const handleConfirmReject = (reason: string) => {
    if (selectedLogForReject) {
      rejectLog(selectedLogForReject.id, reason);
      setSelectedLogForReject(null);
    }
  };

  return (
    <div className="space-y-6 font-sans">
      <RejectReasonModal
        isOpen={!!selectedLogForReject}
        onClose={() => setSelectedLogForReject(null)}
        onConfirm={handleConfirmReject}
        activityName={selectedLogForReject?.activityName}
      />

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
              Hàng đợi Kiểm duyệt Sổ cái (SCR-APPROVE-01)
            </h1>
            {pendingLogs.length > 0 && (
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800">
                {pendingLogs.length} yêu cầu chờ
              </span>
            )}
          </div>
          <p className="text-xs text-gray-500 mt-0.5">
            Phê duyệt hoặc từ chối các yêu cầu phát thải do Thành viên (Editor) nạp vào sổ cái
          </p>
        </div>
      </div>

      {/* Main List */}
      <div className="space-y-4">
        {pendingLogs.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-gray-200/80 shadow-xs">
            <div className="w-12 h-12 bg-emerald-100 text-[#00A76F] rounded-full flex items-center justify-center mx-auto mb-3">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-gray-900">
              Không có yêu cầu nào đang chờ duyệt
            </h3>
            <p className="text-xs text-gray-500 mt-1 max-w-sm mx-auto">
              Tất cả các bản ghi phát thải của các thành viên đều đã được kiểm tra và xử lý xong.
            </p>
          </div>
        ) : (
          pendingLogs.map((log) => (
            <div
              key={log.id}
              className="bg-white rounded-2xl p-6 border border-gray-200/90 shadow-xs hover:border-gray-300 transition-all flex flex-col md:flex-row md:items-center md:justify-between gap-6"
            >
              {/* Request Info */}
              <div className="flex items-start gap-4">
                <img
                  src={
                    log.userAvatar ||
                    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80'
                  }
                  alt={log.userName}
                  className="w-10 h-10 rounded-full object-cover border border-gray-200 flex-shrink-0"
                />

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-gray-900 text-sm">{log.userName}</span>
                    <span className="text-[11px] font-mono text-gray-400">• Ngày {log.date}</span>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700">
                      Nguồn: {log.source}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-gray-900">{log.activityName}</h3>

                  <div className="flex items-center gap-3 text-xs text-gray-600">
                    <span>
                      Sản lượng:{' '}
                      <strong className="text-gray-900">
                        {log.quantity} {log.unit}
                      </strong>
                    </span>
                    <span>•</span>
                    <span>
                      Hệ số: <strong className="text-gray-900">{log.factorApplied}</strong>
                    </span>
                  </div>

                  {log.notes && (
                    <p className="text-xs text-gray-500 bg-gray-50 p-2 rounded-lg border border-gray-100 max-w-xl">
                      Ghi chú: {log.notes}
                    </p>
                  )}
                </div>
              </div>

              {/* Quantitative Badge & Action Buttons */}
              <div className="flex items-center justify-between md:justify-end gap-6 pt-4 md:pt-0 border-t md:border-t-0 border-gray-100">
                <div className="text-right">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                    Quy đổi Phát thải
                  </span>
                  <span className="text-xl font-extrabold text-[#00A76F]">
                    ≈ {log.co2e.toFixed(2)} kg CO2e
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSelectedLogForReject(log)}
                    className="px-3.5 py-2 text-xs font-bold text-red-600 bg-red-50 hover:bg-red-100 rounded-xl transition-all flex items-center gap-1.5"
                  >
                    <X className="w-4 h-4" />
                    <span>Từ chối</span>
                  </button>

                  <button
                    onClick={() => handleApprove(log.id)}
                    className="px-4 py-2 text-xs font-bold text-white bg-[#00A76F] hover:bg-[#00925f] rounded-xl shadow-xs shadow-[#00A76F]/20 transition-all flex items-center gap-1.5"
                  >
                    <Check className="w-4 h-4" />
                    <span>Phê duyệt</span>
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
