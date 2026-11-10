import React, { useState } from 'react';
import { useWorkspace } from '../../context/WorkspaceContext';
import { X, Copy, Check, RefreshCw, QrCode } from 'lucide-react';

interface InviteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InviteModal: React.FC<InviteModalProps> = ({ isOpen, onClose }) => {
  const { activeWorkspace, generateInviteCode } = useWorkspace();
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(activeWorkspace.inviteCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/40 backdrop-blur-xs" onClick={onClose} />

      <div className="relative bg-white rounded-2xl shadow-2xl border border-gray-200 w-full max-w-md overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div>
            <h3 className="text-base font-bold text-gray-900">
              Mã Mời Gia Nhập (SCR-INVITE-MODAL-01)
            </h3>
            <p className="text-xs text-gray-500">
              Gửi mã này cho thành viên gia đình hoặc đồng nghiệp để tham gia
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 text-center space-y-5">
          {/* 6-Character Invite Code Display */}
          <div>
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-widest block mb-2">
              Mã Mời 6 Ký Tự
            </span>
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-emerald-50/80 rounded-2xl border border-emerald-200 shadow-inner">
              <span className="text-3xl font-extrabold tracking-widest text-[#00A76F] font-mono select-all">
                {activeWorkspace.inviteCode}
              </span>
              <button
                onClick={handleCopy}
                className="p-2 rounded-xl bg-white text-[#00A76F] shadow-xs hover:bg-[#00A76F] hover:text-white transition-all"
                title="Sao chép mã"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
            {copied && (
              <div className="text-xs font-semibold text-[#00A76F] mt-1.5 animate-in fade-in">
                ✓ Đã sao chép vào bộ nhớ tạm!
              </div>
            )}
          </div>

          {/* QR Code Placeholder Graphic */}
          <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200 inline-block mx-auto">
            <div className="w-36 h-36 bg-white p-2 rounded-xl border border-gray-200 flex flex-col items-center justify-center text-gray-400 shadow-xs">
              <QrCode className="w-20 h-20 text-gray-800" />
              <span className="text-[10px] text-gray-500 mt-1 font-mono">
                scan-to-join/{activeWorkspace.inviteCode}
              </span>
            </div>
          </div>

          <div className="text-xs text-gray-500 max-w-xs mx-auto leading-relaxed">
            Người nhận nhập mã này tại trang{' '}
            <span className="font-semibold text-gray-700">/workspaces/join</span>. Yêu cầu sẽ ở
            trạng thái Chờ duyệt cho đến khi bạn xác nhận chấp thuận.
          </div>

          {/* Regenerate Button */}
          <div className="pt-2 flex items-center justify-between border-t border-gray-100 text-xs">
            <button
              onClick={() => generateInviteCode()}
              className="text-gray-600 hover:text-[#00A76F] font-semibold flex items-center gap-1.5 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Tạo mã mời mới
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 font-semibold rounded-xl text-gray-700 transition-colors"
            >
              Đóng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
