import React, { createContext, useContext, useState } from 'react';
import { EmissionLog, StandardEmissionFactor } from '../types';
import { MOCK_EMISSION_LOGS, MOCK_FACTORS } from '../mock/mockData';
import { useAuth } from './AuthContext';
import { useWorkspace } from './WorkspaceContext';

interface LedgerContextType {
  logs: EmissionLog[];
  factors: StandardEmissionFactor[];
  pendingLogsCount: number;
  addEmissionLog: (
    data: Omit<
      EmissionLog,
      'id' | 'workspaceId' | 'userId' | 'userName' | 'userAvatar' | 'status' | 'co2e'
    >
  ) => EmissionLog;
  approveLog: (id: string) => void;
  rejectLog: (id: string, reason: string) => void;
  deleteLog: (id: string) => void;
  updateFactor: (id: string, newFactor: number, name?: string) => void;
  addFactor: (factor: Omit<StandardEmissionFactor, 'id' | 'updatedAt'>) => void;
}

const LedgerContext = createContext<LedgerContextType | undefined>(undefined);

export const LedgerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentUser, workspaceRole } = useAuth();
  const { activeWorkspace } = useWorkspace();
  const [logs, setLogs] = useState<EmissionLog[]>(MOCK_EMISSION_LOGS);
  const [factors, setFactors] = useState<StandardEmissionFactor[]>(MOCK_FACTORS);

  const activeLogs = logs.filter((l) => l.workspaceId === activeWorkspace.id);
  const pendingLogsCount = activeLogs.filter((l) => l.status === 'DRAFT').length;

  const addEmissionLog = (
    data: Omit<
      EmissionLog,
      'id' | 'workspaceId' | 'userId' | 'userName' | 'userAvatar' | 'status' | 'co2e'
    >
  ): EmissionLog => {
    const co2e = Number((data.quantity * data.factorApplied).toFixed(2));
    const isReviewer = workspaceRole === 'REVIEWER';

    const newLog: EmissionLog = {
      ...data,
      id: `log-${Date.now()}`,
      workspaceId: activeWorkspace.id,
      userId: currentUser?.id || 'anon',
      userName: currentUser?.name || 'Khách',
      userAvatar: currentUser?.avatarUrl,
      co2e,
      status: isReviewer ? 'APPROVED' : 'DRAFT',
      reviewedBy: isReviewer ? currentUser?.id : undefined,
      reviewerName: isReviewer ? `${currentUser?.name} (Tự duyệt)` : undefined,
      reviewedAt: isReviewer ? new Date().toISOString() : undefined,
    };

    setLogs((prev) => [newLog, ...prev]);
    return newLog;
  };

  const approveLog = (id: string) => {
    setLogs((prev) =>
      prev.map((log) =>
        log.id === id
          ? {
              ...log,
              status: 'APPROVED',
              reviewedBy: currentUser?.id,
              reviewerName: currentUser?.name,
              reviewedAt: new Date().toISOString(),
            }
          : log
      )
    );
  };

  const rejectLog = (id: string, reason: string) => {
    setLogs((prev) =>
      prev.map((log) =>
        log.id === id
          ? {
              ...log,
              status: 'REJECTED',
              rejectReason: reason,
              reviewedBy: currentUser?.id,
              reviewerName: currentUser?.name,
              reviewedAt: new Date().toISOString(),
            }
          : log
      )
    );
  };

  const deleteLog = (id: string) => {
    setLogs((prev) => prev.filter((log) => log.id !== id));
  };

  const updateFactor = (id: string, newFactor: number, name?: string) => {
    setFactors((prev) =>
      prev.map((f) =>
        f.id === id
          ? {
              ...f,
              factor: newFactor,
              name: name || f.name,
              updatedAt: new Date().toISOString().split('T')[0],
            }
          : f
      )
    );
  };

  const addFactor = (factor: Omit<StandardEmissionFactor, 'id' | 'updatedAt'>) => {
    const newFactor: StandardEmissionFactor = {
      ...factor,
      id: `ef-${Date.now()}`,
      updatedAt: new Date().toISOString().split('T')[0],
    };
    setFactors((prev) => [...prev, newFactor]);
  };

  return (
    <LedgerContext.Provider
      value={{
        logs: activeLogs,
        factors,
        pendingLogsCount,
        addEmissionLog,
        approveLog,
        rejectLog,
        deleteLog,
        updateFactor,
        addFactor,
      }}
    >
      {children}
    </LedgerContext.Provider>
  );
};

export const useLedger = () => {
  const context = useContext(LedgerContext);
  if (!context) {
    throw new Error('useLedger must be used within a LedgerProvider');
  }
  return context;
};
