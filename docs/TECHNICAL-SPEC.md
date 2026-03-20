# DelicHubs Dashboard - 技術規格

---

## 一、技術棧

### 核心框架
```json
{
  "next": "14.2.0",
  "react": "18.2.0",
  "react-dom": "18.2.0",
  "typescript": "5.3.0"
}
```

### 樣式
```json
{
  "tailwindcss": "3.4.0",
  "autoprefixer": "10.4.0",
  "postcss": "8.4.0"
}
```

### 圖表
```json
{
  "recharts": "2.12.0"
}
```

### 圖標
```json
{
  "lucide-react": "0.309.0"
}
```

---

## 二、設計系統

### 2.1 色彩

```css
:root {
  /* 背景 */
  --bg-primary: #0a0a0a;
  --bg-secondary: #1a1a1a;
  --bg-tertiary: #262626;

  /* 文字 */
  --text-primary: #ededed;
  --text-secondary: #a3a3a3;
  --text-muted: #737373;

  /* 強調色 */
  --color-blue: #3b82f6;
  --color-green: #10b981;
  --color-purple: #8b5cf6;
  --color-yellow: #f59e0b;
  --color-red: #ef4444;

  /* 邊框 */
  --border-default: #262626;
  --border-hover: #404040;
}
```

### 2.2 字體

```css
/* 標題 */
font-size: 4rem;   /* h1 */
font-size: 2rem;   /* h2 */
font-size: 1.5rem; /* h3 */
font-size: 1.25rem; /* h4 */

/* 內容 */
font-size: 1rem;   /* body */
font-size: 0.875rem; /* small */
font-size: 0.75rem; /* xs */

/* 字重 */
font-weight: 400; /* normal */
font-weight: 600; /* semibold */
font-weight: 700; /* bold */
```

### 2.3 間距

```css
/* 內距 */
padding: 1.5rem; /* p-6 (卡片內距) */
padding: 1rem;   /* p-4 */
padding: 0.5rem; /* p-2 */

/* 外距 */
margin-bottom: 1.5rem; /* mb-6 */
margin-bottom: 1rem;   /* mb-4 */
margin-bottom: 0.5rem; /* mb-2 */

/* 間隙 */
gap: 1.5rem; /* gap-6 */
gap: 1rem;   /* gap-4 */
```

### 2.4 圓角

```css
border-radius: 0.5rem; /* rounded-lg (卡片) */
border-radius: 0.375rem; /* rounded-md (按鈕) */
border-radius: 9999px; /* rounded-full (徽章) */
```

---

## 三、組件規格

### 3.1 Stat Card（頂部統計卡片）

```tsx
interface StatCardProps {
  icon: string;
  title: string;
  value: string | number;
  change: string;
  color: string;
}

// Tailwind Classes
const cardClasses = `
  bg-gray-900
  rounded-lg
  p-6
  border
  border-gray-800
  hover:border-gray-700
  transition-colors
  duration-200
`;

const iconClasses = "text-2xl";
const titleClasses = "text-sm text-gray-400 mb-1";
const valueClasses = "text-3xl font-bold";
const changeClasses = "text-xs text-gray-500 mt-2";
```

### 3.2 Dashboard Card（主要卡片）

```tsx
interface DashboardCardProps {
  title: string;
  icon: React.ReactNode;
  badge?: string;
  children: React.ReactNode;
}

// Tailwind Classes
const cardClasses = `
  bg-gray-900
  rounded-lg
  p-6
  border
  border-gray-800
`;

const headerClasses = "flex items-center justify-between mb-4";
const titleClasses = "text-xl font-bold flex items-center gap-2";
```

### 3.3 Progress Bar

```tsx
interface ProgressBarProps {
  value: number;
  max?: number;
  color?: string;
}

// Tailwind Classes
const containerClasses = "w-full bg-gray-700 rounded-full h-2";
const barClasses = "h-2 rounded-full transition-all duration-500";

// Colors
const colorMap = {
  green: "bg-green-400",
  blue: "bg-blue-400",
  purple: "bg-purple-400",
  yellow: "bg-yellow-400",
};
```

### 3.4 Status Indicator

```tsx
type Status = "active" | "running" | "planning" | "paused";

const statusColors = {
  active: "bg-green-400",
  running: "bg-blue-400",
  planning: "bg-yellow-400",
  paused: "bg-gray-400",
};

// Component
<div className={`w-2 h-2 rounded-full ${statusColors[status]}`} />
```

---

## 四、數據結構

### 4.1 Revenue Data

```typescript
interface RevenueSource {
  name: string;
  amount: number;
  percent: number;
}

interface RevenueData {
  total: number;
  sources: RevenueSource[];
  monthlyGrowth: number;
  lastMonth: number;
}

// 範例數據
const revenueData: RevenueData = {
  total: 12450,
  sources: [
    { name: "GEAR L2", amount: 4000, percent: 32.1 },
    { name: "中文版指南", amount: 3200, percent: 25.7 },
    { name: "技能商店", amount: 2500, percent: 20.1 },
    { name: "其他", amount: 2750, percent: 22.1 },
  ],
  monthlyGrowth: 18.5,
  lastMonth: 10500,
};
```

### 4.2 Token Data

```typescript
interface ModelUsage {
  name: string;
  tokens: string;
  percent: number;
  cost: number;
}

interface TokenData {
  monthTotal: string;
  today: string;
  cost: number;
  models: ModelUsage[];
  apiStatus: {
    errors429: number;
    avgLatency: string;
    quotaRemaining: number;
  };
}

// 範例數據
const tokenData: TokenData = {
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
```

### 4.3 Project Data

```typescript
interface Project {
  name: string;
  progress: number;
  tasks?: string;
  status: "active" | "running" | "planning";
  lastUpdate: string;
}

interface ProjectData {
  total: number;
  projects: Project[];
}

// 範例數據
const projectData: ProjectData = {
  total: 4,
  projects: [
    {
      name: "GEAR Course Factory",
      progress: 80,
      tasks: "34/42",
      status: "active",
      lastUpdate: "2h ago",
    },
    {
      name: "AI 晨讀系統",
      progress: 70,
      tasks: "Running",
      status: "running",
      lastUpdate: "Daily 08:00",
    },
    {
      name: "Delic Club",
      progress: 60,
      tasks: "12 posts/week",
      status: "active",
      lastUpdate: "3h ago",
    },
    {
      name: "Ripple Foundation",
      progress: 30,
      tasks: "Planning",
      status: "planning",
      lastUpdate: "1w ago",
    },
  ],
};
```

### 4.4 Memory Data

```typescript
interface MemoryData {
  totalFacts: number;
  hotFacts: number;
  warmFacts: number;
  coldFacts: number;
  dailyNotes: number;
  lastExtraction: string;
  extractedFacts: number;
}

// 範例數據
const memoryData: MemoryData = {
  totalFacts: 247,
  hotFacts: 89,
  warmFacts: 98,
  coldFacts: 60,
  dailyNotes: 21,
  lastExtraction: "Today 23:00",
  extractedFacts: 12,
};
```

### 4.5 Approval Data

```typescript
interface ApprovalItem {
  id: number;
  type: "email" | "social" | "payment";
  title: string;
  time: string;
}

interface ApprovalData {
  pending: number;
  items: ApprovalItem[];
}

// 範例數據
const approvalData: ApprovalData = {
  pending: 3,
  items: [
    { id: 1, type: "email", title: "Reply to partnership inquiry", time: "10 min ago" },
    { id: 2, type: "social", title: "GEAR L2 promotion copy", time: "2h ago" },
    { id: 3, type: "payment", title: "Skill store commission", time: "1d ago" },
  ],
};
```

### 4.6 User Data

```typescript
interface UserData {
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
}

// 範例數據
const userData: UserData = {
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
```

---

## 五、響應式斷點

```css
/* Tailwind Default Breakpoints */
sm: 640px   /* 手機橫向 */
md: 768px   /* 平板 */
lg: 1024px  /* 小桌面 */
xl: 1280px  /* 桌面 */
2xl: 1536px /* 大桌面 */
```

### 5.1 佈局斷點

```tsx
// Top Stats Grid
<div className="
  grid
  grid-cols-1
  md:grid-cols-2
  lg:grid-cols-4
  gap-6
">

// Main Grid
<div className="
  grid
  grid-cols-1
  lg:grid-cols-2
  gap-6
">
```

---

## 六、性能優化

### 6.1 圖片優化

```tsx
import Image from "next/image";

<Image
  src="/avatar.png"
  alt="Avatar"
  width={40}
  height={40}
  priority={false}
/>
```

### 6.2 代碼分割

```tsx
// 動態導入大型組件
const RevenueChart = dynamic(
  () => import("@/components/charts/RevenueChart"),
  { loading: () => <Skeleton /> }
);
```

### 6.3 字體優化

```tsx
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});
```

---

## 七、文件結構

```
delichubs/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   └── api/
│       ├── revenue/route.ts
│       ├── tokens/route.ts
│       ├── projects/route.ts
│       ├── memory/route.ts
│       ├── approvals/route.ts
│       └── users/route.ts
├── components/
│   ├── dashboard/
│   │   ├── RevenueCard.tsx
│   │   ├── TokenCard.tsx
│   │   ├── ProjectCard.tsx
│   │   ├── MemoryCard.tsx
│   │   ├── ApprovalCard.tsx
│   │   └── UserCard.tsx
│   ├── charts/
│   │   ├── PieChart.tsx
│   │   └── LineChart.tsx
│   └── ui/
│       ├── Card.tsx
│       ├── Badge.tsx
│       ├── Button.tsx
│       └── Skeleton.tsx
├── lib/
│   ├── utils.ts
│   └── api.ts
├── types/
│   └── index.ts
├── public/
│   └── favicon.ico
├── docs/
│   ├── CODEX-TASKS.md
│   ├── TECHNICAL-SPEC.md
│   ├── COMPONENT-DESIGN.md
│   └── DATA-STRUCTURE.md
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## 八、Git 提交規範

### 8.1 格式

```
[Phase N] Short description

Detailed explanation (optional)
```

### 8.2 範例

```
[Phase 1] Verify base setup

- Confirmed pnpm dev works
- Tailwind styles applied
- No TypeScript errors

[Phase 2] Add RevenueCard component

- Created components/dashboard/RevenueCard.tsx
- Displays total revenue and sources
- Added growth indicator
```

---

**此規格為開發依據，所有組件應嚴格遵循。** 📐
