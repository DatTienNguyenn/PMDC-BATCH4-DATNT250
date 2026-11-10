export type GlobalRole = 'SYSTEM_ADMIN' | 'USER';
export type WorkspaceRole = 'REVIEWER' | 'EDITOR';

export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  globalRole: GlobalRole;
  workspaceRole?: WorkspaceRole;
  avatarUrl: string;
  roleBadge: string;
  description: string;
  defaultPath: string;
}

export type WorkspaceType = 'HOUSEHOLD' | 'SMALL_OFFICE';

export interface Workspace {
  id: string;
  name: string;
  type: WorkspaceType;
  ownerId: string;
  inviteCode: string;
  memberCount: number;
  floorArea: number; // m2
  monthlyTarget: number; // kg CO2e
  currentEmissions: number; // kg CO2e
  status: 'ACTIVE' | 'LOCKED';
  createdAt: string;
}

export interface WorkspaceMember {
  id: string;
  workspaceId: string;
  userId: string;
  name: string;
  email: string;
  role: WorkspaceRole;
  joinedAt: string;
  avatarUrl?: string;
  monthlyEmissions: number; // kg CO2e
  approvedCount?: number;
  submittedCount?: number;
}

export type JoinRequestStatus = 'PENDING' | 'ACCEPTED' | 'REJECTED';

export interface JoinRequest {
  id: string;
  workspaceId: string;
  workspaceName: string;
  userId: string;
  userName: string;
  userEmail: string;
  status: JoinRequestStatus;
  rejectReason?: string;
  createdAt: string;
}

export type EmissionCategory =
  | 'ELECTRICITY'
  | 'GAS'
  | 'TRANSPORT'
  | 'WATER'
  | 'WASTE'
  | 'FUGITIVE';

export type EmissionStatus = 'DRAFT' | 'APPROVED' | 'REJECTED';
export type EmissionSource = 'MANUAL' | 'EXCEL' | 'AI_VISION';

export interface EmissionLog {
  id: string;
  workspaceId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  category: EmissionCategory;
  activityName: string;
  quantity: number;
  unit: string;
  factorApplied: number; // kg CO2e per unit
  co2e: number; // kg CO2e
  status: EmissionStatus;
  date: string; // YYYY-MM-DD
  source: EmissionSource;
  receiptUrl?: string;
  reviewedBy?: string;
  reviewerName?: string;
  reviewerAvatar?: string;
  reviewedAt?: string;
  rejectReason?: string;
  notes?: string;
}

export interface StandardEmissionFactor {
  id: string;
  category: EmissionCategory;
  name: string;
  factor: number;
  unit: string;
  source: string;
  updatedAt: string;
  description: string;
}

export interface AIQuickWin {
  id: string;
  title: string;
  desc: string;
  reductionKg: number;
  actionLabel: string;
  applied: boolean;
}

export interface AIRoadmapPhase {
  phase: string;
  title: string;
  targetKg: number;
  targetReduction: string;
  progress: number;
  status: 'completed' | 'in_progress' | 'planned';
}

export interface AIInsightReport {
  id: string;
  workspaceId: string;
  month: string;
  generatedAt: string;
  summary: string;
  keyFindings: Array<{
    title: string;
    desc: string;
    impact: string;
    icon: string;
  }>;
  quickWins: AIQuickWin[];
  roadmap: AIRoadmapPhase[];
}

export interface NotificationItem {
  id: string;
  workspaceId?: string;
  title: string;
  message: string;
  type: 'warning' | 'alert' | 'success' | 'info';
  isRead: boolean;
  createdAt: string;
  link?: string;
}
