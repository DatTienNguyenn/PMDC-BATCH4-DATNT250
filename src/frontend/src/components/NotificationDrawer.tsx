import React from 'react';
import { useWorkspace } from '../context/WorkspaceContext';
import { X, CheckCheck, AlertTriangle, Info, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationDrawer: React.FC<NotificationDrawerProps> = ({
  isOpen,
  onClose,
}) => {
  const { notifications, unreadNotifsCount, markAllNotificationsRead, markNotificationRead } =
    useWorkspace();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/30 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl border-l border-gray-200 flex flex-col">
          {/* Header */}
          <div className="p-5 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-gray-900">Trung tâm Thông báo</h2>
              {unreadNotifsCount > 0 && (
                <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-red-100 text-red-600">
                  {unreadNotifsCount} mới
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              {unreadNotifsCount > 0 && (
                <button
                  onClick={markAllNotificationsRead}
                  className="text-xs font-medium text-[#00A76F] hover:underline flex items-center gap-1"
                >
                  <CheckCheck className="w-3.5 h-3.5" />
                  Đọc tất cả
                </button>
              )}
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {notifications.length === 0 ? (
              <div className="text-center py-12 text-gray-400">
                <span className="material-symbols-outlined text-4xl mb-2 text-gray-300">
                  notifications_off
                </span>
                <p className="text-sm">Không có thông báo nào</p>
              </div>
            ) : (
              notifications.map((n) => {
                const isWarning = n.type === 'warning';
                const isSuccess = n.type === 'success';

                return (
                  <div
                    key={n.id}
                    onClick={() => markNotificationRead(n.id)}
                    className={`p-4 rounded-xl border transition-all ${
                      !n.isRead
                        ? isWarning
                          ? 'bg-amber-50/70 border-amber-200'
                          : 'bg-emerald-50/50 border-emerald-200'
                        : 'bg-white border-gray-100'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`p-2 rounded-lg flex-shrink-0 ${
                          isWarning
                            ? 'bg-amber-100 text-amber-700'
                            : isSuccess
                            ? 'bg-emerald-100 text-[#00A76F]'
                            : 'bg-blue-100 text-blue-600'
                        }`}
                      >
                        {isWarning ? (
                          <AlertTriangle className="w-4 h-4" />
                        ) : isSuccess ? (
                          <CheckCircle2 className="w-4 h-4" />
                        ) : (
                          <Info className="w-4 h-4" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="text-sm font-semibold text-gray-900 truncate">
                            {n.title}
                          </h4>
                          {!n.isRead && (
                            <span className="w-2 h-2 rounded-full bg-[#00A76F]" />
                          )}
                        </div>
                        <p className="text-xs text-gray-600 leading-relaxed mb-2">
                          {n.message}
                        </p>
                        {n.link && (
                          <Link
                            to={n.link}
                            onClick={onClose}
                            className="text-xs font-semibold text-[#00A76F] hover:underline inline-flex items-center gap-1"
                          >
                            Xem chi tiết &rarr;
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
