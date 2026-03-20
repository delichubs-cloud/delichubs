import type {
  ApprovalData,
  DashboardData,
  MemoryData,
  ProjectData,
  RevenueData,
  TokenData,
  UserData,
} from "@/types";

export const revenueData: RevenueData = {
  total: 12450,
  sources: [
    { name: "GEAR L2", amount: 4000, percent: 32.1 },
    { name: "中文版指南", amount: 3200, percent: 25.7 },
    { name: "技能商店", amount: 2500, percent: 20.1 },
    { name: "其他", amount: 2750, percent: 22.1 },
  ],
  growth: 18.5,
  lastMonth: 10500,
};

export const tokenData: TokenData = {
  monthTotal: "2.3M",
  today: "45K",
  cost: 450,
  models: [
    { name: "GLM-5", tokens: "1.2M", percent: 52, cost: 180 },
    { name: "MiniMax", tokens: "0.8M", percent: 35, cost: 200 },
    { name: "Claude Haiku", tokens: "0.3M", percent: 13, cost: 70 },
  ],
  apiStatus: {
    errors429: 0,
    avgLatency: "1.2s",
    quotaRemaining: 87,
  },
};

export const projectData: ProjectData = {
  total: 4,
  projects: [
    {
      id: "proj-1",
      name: "GEAR Course Factory",
      progress: 80,
      tasks: "34/42",
      status: "active",
      lastUpdate: "2h ago",
    },
    {
      id: "proj-2",
      name: "AI 晨讀系統",
      progress: 70,
      tasks: "Running",
      status: "running",
      lastUpdate: "Daily 08:00",
    },
    {
      id: "proj-3",
      name: "Delic Club",
      progress: 60,
      tasks: "12 posts/week",
      status: "active",
      lastUpdate: "3h ago",
    },
    {
      id: "proj-4",
      name: "Ripple Foundation",
      progress: 30,
      tasks: "Planning",
      status: "planning",
      lastUpdate: "1w ago",
    },
  ],
};

export const memoryData: MemoryData = {
  totalFacts: 247,
  hotFacts: 89,
  warmFacts: 98,
  coldFacts: 60,
  dailyNotes: 21,
  lastExtraction: "Today 23:00",
  extractedFacts: 12,
};

export const approvalData: ApprovalData = {
  pending: 3,
  items: [
    {
      id: 1,
      type: "email",
      title: "Reply to partnership inquiry",
      description: "Collaboration proposal from TechCorp",
      time: "10 min ago",
    },
    {
      id: 2,
      type: "social",
      title: "GEAR L2 promotion copy",
      description: "Twitter thread about new features",
      time: "2h ago",
    },
    {
      id: 3,
      type: "payment",
      title: "Skill store commission",
      description: "Monthly payout to skill creators",
      time: "1d ago",
    },
  ],
};

export const userData: UserData = {
  total: 1247,
  paid: 89,
  conversion: 7.1,
  subscriptions: {
    gear: 67,
    guide: 45,
    skills: 32,
  },
  weeklyNew: {
    signups: 156,
    paid: 12,
  },
};

export const dashboardData: DashboardData = {
  revenue: revenueData,
  tokens: tokenData,
  projects: projectData,
  memory: memoryData,
  approvals: approvalData,
  users: userData,
  lastUpdated: new Date().toISOString(),
};
