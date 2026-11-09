import React, { createContext, useContext, useState } from 'react';
import { Workspace, WorkspaceMember, JoinRequest, NotificationItem } from '../types';
import {
  MOCK_WORKSPACES,
  MOCK_MEMBERS,
  MOCK_JOIN_REQUESTS,
  MOCK_NOTIFICATIONS,
} from '../mock/mockData';

interface WorkspaceContextType {
  workspaces: Workspace[];
  activeWorkspace: Workspace;
  members: WorkspaceMember[];
  joinRequests: JoinRequest[];
  notifications: NotificationItem[];
  unreadNotifsCount: number;
  setActiveWorkspaceId: (id: string) => void;
  createWorkspace: (data: Partial<Workspace>) => Workspace;
  updateBaseline: (floorArea: number, memberCount: number) => void;
  updateBudget: (monthlyTarget: number) => void;
  generateInviteCode: () => string;
  approveJoinRequest: (requestId: string) => void;
  rejectJoinRequest: (requestId: string, reason: string) => void;
  markAllNotificationsRead: () => void;
  markNotificationRead: (id: string) => void;
}

const WorkspaceContext = createContext<WorkspaceContextType | undefined>(undefined);

export const WorkspaceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [workspaces, setWorkspaces] = useState<Workspace[]>(MOCK_WORKSPACES);
  const [activeWorkspaceId, setActiveWorkspaceIdState] = useState<string>('ws-01');
  const [members, setMembers] = useState<WorkspaceMember[]>(MOCK_MEMBERS);
  const [joinRequests, setJoinRequests] = useState<JoinRequest[]>(MOCK_JOIN_REQUESTS);
  const [notifications, setNotifications] = useState<NotificationItem[]>(MOCK_NOTIFICATIONS);

  const activeWorkspace =
    workspaces.find((w) => w.id === activeWorkspaceId) || workspaces[0];

  const setActiveWorkspaceId = (id: string) => {
    setActiveWorkspaceIdState(id);
  };

  const createWorkspace = (data: Partial<Workspace>): Workspace => {
    const newWs: Workspace = {
      id: `ws-${Date.now()}`,
      name: data.name || 'Không gian mới',
      type: data.type || 'HOUSEHOLD',
      ownerId: 'user-01',
      inviteCode: Math.random().toString(36).substring(2, 8).toUpperCase(),
      memberCount: data.memberCount || 1,
      floorArea: data.floorArea || 80,
      monthlyTarget: data.monthlyTarget || 200,
      currentEmissions: 0,
      status: 'ACTIVE',
      createdAt: new Date().toISOString(),
    };

    setWorkspaces((prev) => [newWs, ...prev]);
    setActiveWorkspaceIdState(newWs.id);
    return newWs;
  };

  const updateBaseline = (floorArea: number, memberCount: number) => {
    setWorkspaces((prev) =>
      prev.map((w) =>
        w.id === activeWorkspace.id ? { ...w, floorArea, memberCount } : w
      )
    );
  };

  const updateBudget = (monthlyTarget: number) => {
    setWorkspaces((prev) =>
      prev.map((w) =>
        w.id === activeWorkspace.id ? { ...w, monthlyTarget } : w
      )
    );
  };

  const generateInviteCode = (): string => {
    const newCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    setWorkspaces((prev) =>
      prev.map((w) =>
        w.id === activeWorkspace.id ? { ...w, inviteCode: newCode } : w
      )
    );
    return newCode;
  };

  const approveJoinRequest = (requestId: string) => {
    const target = joinRequests.find((r) => r.id === requestId);
    if (!target) return;

    setJoinRequests((prev) =>
      prev.map((r) => (r.id === requestId ? { ...r, status: 'ACCEPTED' } : r))
    );

    const newMember: WorkspaceMember = {
      id: `mem-${Date.now()}`,
      workspaceId: target.workspaceId,
      userId: target.userId,
      name: target.userName,
      email: target.userEmail,
      role: 'EDITOR',
      joinedAt: new Date().toISOString(),
      monthlyEmissions: 0,
      avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
    };

    setMembers((prev) => [...prev, newMember]);
    setWorkspaces((prev) =>
      prev.map((w) =>
        w.id === target.workspaceId ? { ...w, memberCount: w.memberCount + 1 } : w
      )
    );
  };

  const rejectJoinRequest = (requestId: string, reason: string) => {
    setJoinRequests((prev) =>
      prev.map((r) =>
        r.id === requestId ? { ...r, status: 'REJECTED', rejectReason: reason } : r
      )
    );
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const markNotificationRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  const unreadNotifsCount = notifications.filter((n) => !n.isRead).length;

  return (
    <WorkspaceContext.Provider
      value={{
        workspaces,
        activeWorkspace,
        members: members.filter((m) => m.workspaceId === activeWorkspace.id),
        joinRequests: joinRequests.filter((r) => r.workspaceId === activeWorkspace.id),
        notifications,
        unreadNotifsCount,
        setActiveWorkspaceId,
        createWorkspace,
        updateBaseline,
        updateBudget,
        generateInviteCode,
        approveJoinRequest,
        rejectJoinRequest,
        markAllNotificationsRead,
        markNotificationRead,
      }}
    >
      {children}
    </WorkspaceContext.Provider>
  );
};

export const useWorkspace = () => {
  const context = useContext(WorkspaceContext);
  if (!context) {
    throw new Error('useWorkspace must be used within a WorkspaceProvider');
  }
  return context;
};
