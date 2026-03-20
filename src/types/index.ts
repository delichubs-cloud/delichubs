export interface RevenueSource {
  name: string;
  amount: number;
  percent: number;
}

export interface RevenueData {
  total: number;
  sources: RevenueSource[];
  growth: number;
  lastMonth: number;
}

export interface ModelUsage {
  name: string;
  tokens: string;
  percent: number;
  cost: number;
}

export interface ApiStatus {
  errors429: number;
  avgLatency: string;
  quotaRemaining: number;
}

export interface TokenData {
  monthTotal: string;
  today: string;
  cost: number;
  models: ModelUsage[];
  apiStatus: ApiStatus;
}

export type ProjectStatus = "active" | "running" | "planning" | "paused";

export interface Project {
  id: string;
  name: string;
  progress: number;
  tasks: string;
  status: ProjectStatus;
  lastUpdate: string;
}

export interface ProjectData {
  total: number;
  projects: Project[];
}

export interface MemoryData {
  totalFacts: number;
  hotFacts: number;
  warmFacts: number;
  coldFacts: number;
  dailyNotes: number;
  lastExtraction: string;
  extractedFacts: number;
}

export type ApprovalType = "email" | "social" | "payment";

export interface ApprovalItem {
  id: number;
  type: ApprovalType;
  title: string;
  description?: string;
  time: string;
}

export interface ApprovalData {
  pending: number;
  items: ApprovalItem[];
}

export interface SubscriptionData {
  gear: number;
  guide: number;
  skills: number;
}

export interface WeeklyGrowth {
  signups: number;
  paid: number;
}

export interface UserData {
  total: number;
  paid: number;
  conversion: number;
  subscriptions: SubscriptionData;
  weeklyNew: WeeklyGrowth;
}

export interface DashboardData {
  revenue: RevenueData;
  tokens: TokenData;
  projects: ProjectData;
  memory: MemoryData;
  approvals: ApprovalData;
  users: UserData;
  lastUpdated: string;
}
