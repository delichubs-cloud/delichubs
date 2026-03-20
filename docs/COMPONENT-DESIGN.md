# DelicHubs Dashboard - 組件設計

---

## 一、組件總覽

| 組件 | 路徑 | 用途 |
|------|------|------|
| **StatCard** | components/ui/StatCard.tsx | 頂部統計卡片 |
| **RevenueCard** | components/dashboard/RevenueCard.tsx | 收入分析 |
| **TokenCard** | components/dashboard/TokenCard.tsx | Token 消耗 |
| **ProjectCard** | components/dashboard/ProjectCard.tsx | 項目進度 |
| **MemoryCard** | components/dashboard/MemoryCard.tsx | 記憶系統 |
| **ApprovalCard** | components/dashboard/ApprovalCard.tsx | 審批隊列 |
| **UserCard** | components/dashboard/UserCard.tsx | 用戶統計 |

---

## 二、StatCard 組件

### 2.1 Props

```typescript
interface StatCardProps {
  icon: string;
  title: string;
  value: string | number;
  change: string;
  color: "green" | "blue" | "purple" | "yellow";
}
```

### 2.2 實現

```tsx
// components/ui/StatCard.tsx
interface StatCardProps {
  icon: string;
  title: string;
  value: string | number;
  change: string;
  color: "green" | "blue" | "purple" | "yellow";
}

const colorMap = {
  green: "text-green-400",
  blue: "text-blue-400",
  purple: "text-purple-400",
  yellow: "text-yellow-400",
};

export default function StatCard({ icon, title, value, change, color }: StatCardProps) {
  return (
    <div className="bg-gray-900 rounded-lg p-6 border border-gray-800 hover:border-gray-700 transition-colors">
      <div className="flex items-center justify-between mb-4">
        <span className="text-2xl">{icon}</span>
        <span className="text-xs text-gray-500">Live</span>
      </div>
      <p className="text-sm text-gray-400 mb-1">{title}</p>
      <p className={`text-3xl font-bold ${colorMap[color]}`}>{value}</p>
      <p className="text-xs text-gray-500 mt-2">{change}</p>
    </div>
  );
}
```

### 2.3 使用

```tsx
<StatCard
  icon="💰"
  title="Total Revenue"
  value="$12,450"
  change="+18.5% vs last month"
  color="green"
/>
```

---

## 三、RevenueCard 組件

### 3.1 Props

```typescript
interface RevenueSource {
  name: string;
  amount: number;
  percent: number;
}

interface RevenueCardProps {
  data: {
    total: number;
    sources: RevenueSource[];
    growth: number;
  };
}
```

### 3.2 實現

```tsx
// components/dashboard/RevenueCard.tsx
import { DollarSign, TrendingUp } from "lucide-react";

interface RevenueSource {
  name: string;
  amount: number;
  percent: number;
}

interface RevenueCardProps {
  data: {
    total: number;
    sources: RevenueSource[];
    growth: number;
  };
}

export default function RevenueCard({ data }: RevenueCardProps) {
  return (
    <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <DollarSign className="w-5 h-5 text-green-400" />
          💰 Revenue Analysis
        </h2>
        <span className="text-xs text-gray-400">Real-time</span>
      </div>

      {/* Total Revenue */}
      <div className="mb-6">
        <p className="text-gray-400 text-sm">Total Revenue (Net)</p>
        <p className="text-4xl font-bold text-green-400">
          ${data.total.toLocaleString()}
        </p>
      </div>

      {/* Revenue Sources */}
      <div className="space-y-3">
        <p className="text-sm text-gray-400">Revenue Sources</p>
        {data.sources.map((source, idx) => (
          <div key={idx} className="flex items-center justify-between">
            <span className="text-sm">{source.name}</span>
            <div className="flex items-center gap-2">
              <span className="text-sm font-mono">
                ${source.amount.toLocaleString()}
              </span>
              <span className="text-xs text-gray-500">
                ({source.percent}%)
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Growth Indicator */}
      <div className="mt-6 flex items-center gap-2 text-sm text-green-400">
        <TrendingUp className="w-4 h-4" />
        <span>+{data.growth}% vs last month</span>
      </div>
    </div>
  );
}
```

### 3.3 使用

```tsx
<RevenueCard
  data={{
    total: 12450,
    sources: [
      { name: "GEAR L2", amount: 4000, percent: 32.1 },
      { name: "中文版指南", amount: 3200, percent: 25.7 },
      { name: "技能商店", amount: 2500, percent: 20.1 },
      { name: "其他", amount: 2750, percent: 22.1 },
    ],
    growth: 18.5,
  }}
/>
```

---

## 四、TokenCard 組件

### 4.1 Props

```typescript
interface ModelUsage {
  name: string;
  tokens: string;
  percent: number;
  cost: number;
}

interface TokenCardProps {
  data: {
    monthTotal: string;
    today: string;
    cost: number;
    models: ModelUsage[];
    apiStatus: {
      errors429: number;
      avgLatency: string;
      quotaRemaining: number;
    };
  };
}
```

### 4.2 實現

```tsx
// components/dashboard/TokenCard.tsx
import { Activity } from "lucide-react";

interface ModelUsage {
  name: string;
  tokens: string;
  percent: number;
}

interface TokenCardProps {
  data: {
    monthTotal: string;
    today: string;
    cost: number;
    models: ModelUsage[];
    apiStatus: {
      errors429: number;
      avgLatency: string;
      quotaRemaining: number;
    };
  };
}

export default function TokenCard({ data }: TokenCardProps) {
  return (
    <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <Activity className="w-5 h-5 text-blue-400" />
          🎯 Token Usage
        </h2>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-xs text-gray-400">Live</span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div>
          <p className="text-gray-400 text-xs">Month Total</p>
          <p className="text-2xl font-bold">{data.monthTotal}</p>
        </div>
        <div>
          <p className="text-gray-400 text-xs">Today</p>
          <p className="text-2xl font-bold">{data.today}</p>
        </div>
        <div>
          <p className="text-gray-400 text-xs">Cost</p>
          <p className="text-2xl font-bold text-yellow-400">${data.cost}</p>
        </div>
      </div>

      {/* Model Distribution */}
      <div className="space-y-3">
        <p className="text-sm text-gray-400">Model Distribution</p>
        {data.models.map((model, idx) => (
          <div key={idx}>
            <div className="flex justify-between text-sm mb-1">
              <span>{model.name}</span>
              <span>{model.tokens} ({model.percent}%)</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div
                className="bg-blue-400 h-2 rounded-full"
                style={{ width: `${model.percent}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      {/* API Status */}
      <div className="mt-6 grid grid-cols-3 gap-2 text-xs text-gray-400">
        <div>429 Errors: {data.apiStatus.errors429}</div>
        <div>Latency: {data.apiStatus.avgLatency}</div>
        <div>Quota: {data.apiStatus.quotaRemaining}%</div>
      </div>
    </div>
  );
}
```

---

## 五、ProjectCard 組件

### 5.1 Props

```typescript
interface Project {
  name: string;
  progress: number;
  tasks: string;
  status: "active" | "running" | "planning";
  lastUpdate: string;
}

interface ProjectCardProps {
  data: {
    total: number;
    projects: Project[];
  };
}
```

### 5.2 實現

```tsx
// components/dashboard/ProjectCard.tsx

interface Project {
  name: string;
  progress: number;
  tasks: string;
  status: "active" | "running" | "planning";
  lastUpdate: string;
}

interface ProjectCardProps {
  data: {
    total: number;
    projects: Project[];
  };
}

const statusColors = {
  active: "bg-green-400",
  running: "bg-blue-400",
  planning: "bg-yellow-400",
};

export default function ProjectCard({ data }: ProjectCardProps) {
  return (
    <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">🚀 Active Projects</h2>
        <span className="text-xs text-gray-400">{data.total} total</span>
      </div>

      <div className="space-y-4">
        {data.projects.map((project, idx) => (
          <div key={idx}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${statusColors[project.status]}`}></div>
                <span className="font-medium">{project.name}</span>
              </div>
              <span className="text-sm text-gray-400">{project.tasks}</span>
            </div>

            <div className="w-full bg-gray-700 rounded-full h-2 mb-1">
              <div
                className="bg-purple-400 h-2 rounded-full transition-all duration-500"
                style={{ width: `${project.progress}%` }}
              ></div>
            </div>

            <div className="flex justify-between text-xs text-gray-500">
              <span>{project.progress}% complete</span>
              <span>{project.lastUpdate}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
```

---

## 六、MemoryCard 組件

### 6.1 實現

```tsx
// components/dashboard/MemoryCard.tsx

interface MemoryCardProps {
  data: {
    totalFacts: number;
    hotFacts: number;
    warmFacts: number;
    coldFacts: number;
    dailyNotes: number;
    lastExtraction: string;
    extractedFacts: number;
  };
}

export default function MemoryCard({ data }: MemoryCardProps) {
  return (
    <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">🧠 Memory System</h2>
        <span className="text-xs px-2 py-1 bg-green-900 text-green-400 rounded">
          Healthy
        </span>
      </div>

      {/* Knowledge Graph */}
      <div className="mb-6">
        <p className="text-sm text-gray-400 mb-3">📚 Knowledge Graph</p>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-2xl font-bold">{data.totalFacts}</p>
            <p className="text-xs text-gray-500">Total Facts</p>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>🔥 Hot (7d)</span>
              <span className="text-orange-400">{data.hotFacts}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>🌡️ Warm (8-30d)</span>
              <span className="text-yellow-400">{data.warmFacts}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>❄️ Cold (30+)</span>
              <span className="text-blue-400">{data.coldFacts}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Daily Notes */}
      <div className="mb-6">
        <p className="text-sm text-gray-400 mb-2">📝 Daily Notes</p>
        <p className="text-lg">
          <span className="font-bold">{data.dailyNotes}</span>
          <span className="text-gray-500 text-sm ml-2">days</span>
        </p>
      </div>

      {/* Nightly Extraction */}
      <div className="p-3 bg-gray-800 rounded">
        <p className="text-sm text-gray-400 mb-1">🔄 Nightly Extraction</p>
        <div className="flex justify-between text-sm">
          <span>Last: {data.lastExtraction}</span>
          <span className="text-green-400">+{data.extractedFacts} facts</span>
        </div>
      </div>
    </div>
  );
}
```

---

## 七、ApprovalCard 組件

### 7.1 實現

```tsx
// components/dashboard/ApprovalCard.tsx

interface ApprovalItem {
  id: number;
  type: "email" | "social" | "payment";
  title: string;
  time: string;
}

interface ApprovalCardProps {
  data: {
    pending: number;
    items: ApprovalItem[];
  };
}

const iconMap = {
  email: "📧",
  social: "📱",
  payment: "💰",
};

export default function ApprovalCard({ data }: ApprovalCardProps) {
  return (
    <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">✅ Approval Queue</h2>
        <span className="bg-yellow-900 text-yellow-400 text-xs px-2 py-1 rounded">
          {data.pending} pending
        </span>
      </div>

      <div className="space-y-3">
        {data.items.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between p-3 bg-gray-800 rounded hover:bg-gray-700 transition cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <span className="text-xl">{iconMap[item.type]}</span>
              <div>
                <p className="font-medium">{item.title}</p>
                <p className="text-xs text-gray-500">{item.time}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="text-xs px-3 py-1 bg-green-600 hover:bg-green-500 rounded">
                Approve
              </button>
              <button className="text-xs px-3 py-1 bg-gray-600 hover:bg-gray-500 rounded">
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>

      {data.items.length === 0 && (
        <p className="text-center text-gray-500 py-8">
          ✨ All tasks completed
        </p>
      )}
    </div>
  );
}
```

---

## 八、UserCard 組件

### 8.1 實現

```tsx
// components/dashboard/UserCard.tsx

interface UserCardProps {
  data: {
    total: number;
    paid: number;
    conversion: number;
    subscriptions: {
      gear: number;
      guide: number;
      skills: number;
    };
    weeklyNew: {
      signups: number;
      paid: number;
    };
  };
}

export default function UserCard({ data }: UserCardProps) {
  return (
    <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">👥 User Statistics</h2>
        <span className="text-xs text-gray-400">Real-time</span>
      </div>

      {/* Main Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div>
          <p className="text-gray-400 text-xs">Total Users</p>
          <p className="text-2xl font-bold">{data.total.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-gray-400 text-xs">Paid Users</p>
          <p className="text-2xl font-bold text-green-400">{data.paid}</p>
        </div>
        <div>
          <p className="text-gray-400 text-xs">Conversion</p>
          <p className="text-2xl font-bold text-purple-400">{data.conversion}%</p>
        </div>
      </div>

      {/* Subscription Distribution */}
      <div className="mb-6">
        <p className="text-sm text-gray-400 mb-3">📊 Subscription Distribution</p>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>GEAR L2</span>
            <span>{data.subscriptions.gear} users</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>中文版指南</span>
            <span>{data.subscriptions.guide} purchases</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>技能商店</span>
            <span>{data.subscriptions.skills} purchases</span>
          </div>
        </div>
      </div>

      {/* Weekly Growth */}
      <div className="p-3 bg-gray-800 rounded">
        <p className="text-sm text-gray-400 mb-2">📈 Weekly Growth</p>
        <div className="flex justify-between text-sm">
          <span>
            Signups: <span className="text-green-400">+{data.weeklyNew.signups}</span>
          </span>
          <span>
            Paid: <span className="text-blue-400">+{data.weeklyNew.paid}</span>
          </span>
        </div>
      </div>
    </div>
  );
}
```

---

## 九、主頁整合

### 9.1 app/page.tsx

```tsx
// app/page.tsx
import StatCard from "@/components/ui/StatCard";
import RevenueCard from "@/components/dashboard/RevenueCard";
import TokenCard from "@/components/dashboard/TokenCard";
import ProjectCard from "@/components/dashboard/ProjectCard";
import MemoryCard from "@/components/dashboard/MemoryCard";
import ApprovalCard from "@/components/dashboard/ApprovalCard";
import UserCard from "@/components/dashboard/UserCard";

// Mock Data
const revenueData = {
  total: 12450,
  sources: [
    { name: "GEAR L2", amount: 4000, percent: 32.1 },
    { name: "中文版指南", amount: 3200, percent: 25.7 },
    { name: "技能商店", amount: 2500, percent: 20.1 },
    { name: "其他", amount: 2750, percent: 22.1 },
  ],
  growth: 18.5,
};

const tokenData = {
  monthTotal: "2.3M",
  today: "45K",
  cost: 450,
  models: [
    { name: "GLM-5", tokens: "1.2M", percent: 52 },
    { name: "MiniMax", tokens: "0.8M", percent: 35 },
    { name: "Claude Haiku", tokens: "0.3M", percent: 13 },
  ],
  apiStatus: { errors429: 0, avgLatency: "1.2s", quotaRemaining: 87 },
};

const projectData = {
  total: 4,
  projects: [
    { name: "GEAR Course Factory", progress: 80, tasks: "34/42", status: "active", lastUpdate: "2h ago" },
    { name: "AI 晨讀系統", progress: 70, tasks: "Running", status: "running", lastUpdate: "Daily 08:00" },
    { name: "Delic Club", progress: 60, tasks: "12 posts/week", status: "active", lastUpdate: "3h ago" },
    { name: "Ripple Foundation", progress: 30, tasks: "Planning", status: "planning", lastUpdate: "1w ago" },
  ],
};

const memoryData = {
  totalFacts: 247,
  hotFacts: 89,
  warmFacts: 98,
  coldFacts: 60,
  dailyNotes: 21,
  lastExtraction: "Today 23:00",
  extractedFacts: 12,
};

const approvalData = {
  pending: 3,
  items: [
    { id: 1, type: "email", title: "Reply to partnership inquiry", time: "10 min ago" },
    { id: 2, type: "social", title: "GEAR L2 promotion copy", time: "2h ago" },
    { id: 3, type: "payment", title: "Skill store commission", time: "1d ago" },
  ],
};

const userData = {
  total: 1247,
  paid: 89,
  conversion: 7.1,
  subscriptions: { gear: 67, guide: 45, skills: 32 },
  weeklyNew: { signups: 156, paid: 12 },
};

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">🏠 DelicHubs Dashboard</h1>
          <p className="text-gray-400">
            Transparent AI Operations • Last updated: {new Date().toLocaleString("zh-TW", { timeZone: "Asia/Hong_Kong" })}
          </p>
        </div>

        {/* Top Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard icon="💰" title="Total Revenue" value="$12,450" change="+18.5% vs last month" color="green" />
          <StatCard icon="🎯" title="Token Usage" value="2.3M" change="45K today" color="blue" />
          <StatCard icon="👥" title="Total Users" value="156" change="89 paid" color="purple" />
          <StatCard icon="⏰" title="Active Days" value="47" change="days" color="yellow" />
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RevenueCard data={revenueData} />
          <TokenCard data={tokenData} />
          <ProjectCard data={projectData} />
          <MemoryCard data={memoryData} />
          <ApprovalCard data={approvalData} />
          <UserCard data={userData} />
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-gray-500 text-sm">
          <p>Powered by OpenClaw • Built with Next.js</p>
          <p className="mt-2">
            <a href="https://github.com/delichubs-cloud/delichubs" className="text-blue-400 hover:underline">
              View Source on GitHub
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}
```

---

**所有組件設計完成，可直接複製使用。** 🎨
