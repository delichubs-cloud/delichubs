# DelicHubs Dashboard - 數據結構

---

## 一、數據總覽

| 數據類型 | 用途 | 組件 |
|----------|------|------|
| **RevenueData** | 收入數據 | RevenueCard |
| **TokenData** | Token 消耗 | TokenCard |
| **ProjectData** | 項目進度 | ProjectCard |
| **MemoryData** | 記憶系統 | MemoryCard |
| **ApprovalData** | 審批隊列 | ApprovalCard |
| **UserData** | 用戶統計 | UserCard |

---

## 二、TypeScript 定義

### 2.1 types/index.ts

```typescript
// types/index.ts

// ==================== Revenue ====================
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

// ==================== Token ====================
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

// ==================== Project ====================
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

// ==================== Memory ====================
export interface MemoryData {
  totalFacts: number;
  hotFacts: number;
  warmFacts: number;
  coldFacts: number;
  dailyNotes: number;
  lastExtraction: string;
  extractedFacts: number;
}

// ==================== Approval ====================
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

// ==================== User ====================
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

// ==================== Dashboard ====================
export interface DashboardData {
  revenue: RevenueData;
  tokens: TokenData;
  projects: ProjectData;
  memory: MemoryData;
  approvals: ApprovalData;
  users: UserData;
  lastUpdated: string;
}
```

---

## 三、Mock 數據

### 3.1 lib/mockData.ts

```typescript
// lib/mockData.ts
import {
  RevenueData,
  TokenData,
  ProjectData,
  MemoryData,
  ApprovalData,
  UserData,
  DashboardData,
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
```

---

## 四、API 端點

### 4.1 app/api/dashboard/route.ts

```typescript
// app/api/dashboard/route.ts
import { NextResponse } from "next/server";
import { dashboardData } from "@/lib/mockData";

export async function GET() {
  return NextResponse.json(dashboardData);
}
```

### 4.2 app/api/revenue/route.ts

```typescript
// app/api/revenue/route.ts
import { NextResponse } from "next/server";
import { revenueData } from "@/lib/mockData";

export async function GET() {
  return NextResponse.json(revenueData);
}
```

### 4.3 app/api/tokens/route.ts

```typescript
// app/api/tokens/route.ts
import { NextResponse } from "next/server";
import { tokenData } from "@/lib/mockData";

export async function GET() {
  return NextResponse.json(tokenData);
}
```

### 4.4 app/api/projects/route.ts

```typescript
// app/api/projects/route.ts
import { NextResponse } from "next/server";
import { projectData } from "@/lib/mockData";

export async function GET() {
  return NextResponse.json(projectData);
}
```

### 4.5 app/api/memory/route.ts

```typescript
// app/api/memory/route.ts
import { NextResponse } from "next/server";
import { memoryData } from "@/lib/mockData";

export async function GET() {
  return NextResponse.json(memoryData);
}
```

### 4.6 app/api/approvals/route.ts

```typescript
// app/api/approvals/route.ts
import { NextResponse } from "next/server";
import { approvalData } from "@/lib/mockData";

export async function GET() {
  return NextResponse.json(approvalData);
}

export async function POST(request: Request) {
  const body = await request.json();
  // Handle approval action
  const { itemId, action } = body;

  // TODO: Implement actual approval logic

  return NextResponse.json({
    success: true,
    message: `Item ${itemId} ${action}ed`,
  });
}
```

### 4.7 app/api/users/route.ts

```typescript
// app/api/users/route.ts
import { NextResponse } from "next/server";
import { userData } from "@/lib/mockData";

export async function GET() {
  return NextResponse.json(userData);
}
```

---

## 五、數據獲取 Hook

### 5.1 lib/useDashboardData.ts

```typescript
// lib/useDashboardData.ts
import { useQuery } from "@tanstack/react-query";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "";

export function useDashboardData() {
  return useQuery({
    queryKey: ["dashboard"],
    queryFn: async () => {
      const res = await fetch(`${API_BASE}/api/dashboard`);
      if (!res.ok) throw new Error("Failed to fetch dashboard data");
      return res.json();
    },
    refetchInterval: 30000, // Refresh every 30s
  });
}

export function useRevenueData() {
  return useQuery({
    queryKey: ["revenue"],
    queryFn: async () => {
      const res = await fetch(`${API_BASE}/api/revenue`);
      if (!res.ok) throw new Error("Failed to fetch revenue data");
      return res.json();
    },
  });
}

export function useTokenData() {
  return useQuery({
    queryKey: ["tokens"],
    queryFn: async () => {
      const res = await fetch(`${API_BASE}/api/tokens`);
      if (!res.ok) throw new Error("Failed to fetch token data");
      return res.json();
    },
    refetchInterval: 60000, // Refresh every 60s
  });
}

export function useProjectData() {
  return useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const res = await fetch(`${API_BASE}/api/projects`);
      if (!res.ok) throw new Error("Failed to fetch project data");
      return res.json();
    },
  });
}

export function useMemoryData() {
  return useQuery({
    queryKey: ["memory"],
    queryFn: async () => {
      const res = await fetch(`${API_BASE}/api/memory`);
      if (!res.ok) throw new Error("Failed to fetch memory data");
      return res.json();
    },
  });
}

export function useApprovalData() {
  return useQuery({
    queryKey: ["approvals"],
    queryFn: async () => {
      const res = await fetch(`${API_BASE}/api/approvals`);
      if (!res.ok) throw new Error("Failed to fetch approval data");
      return res.json();
    },
    refetchInterval: 10000, // Refresh every 10s
  });
}

export function useUserData() {
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await fetch(`${API_BASE}/api/users`);
      if (!res.ok) throw new Error("Failed to fetch user data");
      return res.json();
    },
  });
}
```

---

## 六、實時更新

### 6.1 Server-Sent Events（可選）

```typescript
// app/api/stream/route.ts
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      // Send initial data
      const data = JSON.stringify({ type: "init", data: dashboardData });
      controller.enqueue(encoder.encode(`data: ${data}\n\n`));

      // Send updates every 30 seconds
      const interval = setInterval(() => {
        const update = JSON.stringify({
          type: "update",
          timestamp: new Date().toISOString(),
        });
        controller.enqueue(encoder.encode(`data: ${update}\n\n`));
      }, 30000);

      // Clean up on disconnect
      request.signal.addEventListener("abort", () => {
        clearInterval(interval);
        controller.close();
      });
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
```

---

## 七、數據驗證

### 7.1 lib/validators.ts

```typescript
// lib/validators.ts
import { z } from "zod";

export const RevenueSourceSchema = z.object({
  name: z.string(),
  amount: z.number().positive(),
  percent: z.number().min(0).max(100),
});

export const RevenueDataSchema = z.object({
  total: z.number().nonnegative(),
  sources: z.array(RevenueSourceSchema),
  growth: z.number(),
  lastMonth: z.number().nonnegative(),
});

export const TokenDataSchema = z.object({
  monthTotal: z.string(),
  today: z.string(),
  cost: z.number().nonnegative(),
  models: z.array(
    z.object({
      name: z.string(),
      tokens: z.string(),
      percent: z.number().min(0).max(100),
      cost: z.number().nonnegative(),
    })
  ),
  apiStatus: z.object({
    errors429: z.number().int().nonnegative(),
    avgLatency: z.string(),
    quotaRemaining: z.number().min(0).max(100),
  }),
});

export const ProjectSchema = z.object({
  id: z.string(),
  name: z.string(),
  progress: z.number().min(0).max(100),
  tasks: z.string(),
  status: z.enum(["active", "running", "planning", "paused"]),
  lastUpdate: z.string(),
});

export const ProjectDataSchema = z.object({
  total: z.number().int().nonnegative(),
  projects: z.array(ProjectSchema),
});

// 使用範例
export function validateRevenueData(data: unknown) {
  return RevenueDataSchema.parse(data);
}
```

---

## 八、數據轉換工具

### 8.1 lib/formatters.ts

```typescript
// lib/formatters.ts

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat("en-US").format(num);
}

export function formatPercent(value: number): string {
  return `${value.toFixed(1)}%`;
}

export function formatTokenCount(count: string): string {
  // Convert "2.3M" to display format
  return count;
}

export function getRelativeTime(date: Date | string): string {
  const now = new Date();
  const then = typeof date === "string" ? new Date(date) : date;
  const diffMs = now.getTime() - then.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return then.toLocaleDateString();
}

export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    active: "text-green-400",
    running: "text-blue-400",
    planning: "text-yellow-400",
    paused: "text-gray-400",
  };
  return colors[status] || "text-gray-400";
}

export function getIconForType(type: string): string {
  const icons: Record<string, string> = {
    email: "📧",
    social: "📱",
    payment: "💰",
  };
  return icons[type] || "📄";
}
```

---

**數據結構設計完成，可直接使用於專案。** 📊
