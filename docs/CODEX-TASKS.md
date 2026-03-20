# Codex 任務清單

**項目：** DelicHubs Dashboard
**本地路徑：** `/Users/javis/projects/delichubs`
**GitHub：** https://github.com/delichubs-cloud/delichubs

---

## 📋 Task List

### ✅ Task 0: 專案初始化（已完成）

---

### 🔴 Task 1: 驗證基礎設置

**目標：** 確認專案可正常運行

```bash
cd /Users/javis/projects/delichubs
pnpm install
pnpm dev
```

**驗收標準：**
- [ ] `pnpm dev` 正常啟動
- [ ] http://localhost:3000 可訪問
- [ ] 無 TypeScript 錯誤
- [ ] Tailwind 樣式生效

**提交訊息：** `[Phase 1] Verify base setup`

---

### 🔴 Task 2: 建立頂部統計卡片

**目標：** 建立 4 個頂部統計卡片

**規格：**

```
位置：app/page.tsx
佈局：grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6
```

**卡片 1 - Total Revenue**
```
標題：Total Revenue
數值：$12,450
變化：+18.5% vs last month
圖標：💰
顏色：text-green-400
```

**卡片 2 - Token Usage**
```
標題：Token Usage
數值：2.3M
變化：45K today
圖標：🎯
顏色：text-blue-400
```

**卡片 3 - Total Users**
```
標題：Total Users
數值：156
變化：89 paid
圖標：👥
顏色：text-purple-400
```

**卡片 4 - Active Days**
```
標題：Active Days
數值：47
變化：days
圖標：⏰
顏色：text-yellow-400
```

**樣式：**
```tsx
<div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
  <div className="flex items-center justify-between mb-4">
    <span className="text-2xl">{icon}</span>
    <span className="text-xs text-gray-500">Live</span>
  </div>
  <p className="text-sm text-gray-400 mb-1">{title}</p>
  <p className={`text-3xl font-bold ${color}`}>{value}</p>
  <p className="text-xs text-gray-500 mt-2">{change}</p>
</div>
```

**提交訊息：** `[Phase 2] Add top stats cards`

---

### 🔴 Task 3: 建立 Revenue Card

**目標：** 建立收入分析卡片

**位置：** `components/dashboard/RevenueCard.tsx`

**規格：**
```
┌─────────────────────────────────────┐
│ 💰 Revenue Analysis                 │
├─────────────────────────────────────┤
│ Total Revenue (Net)                 │
│ $12,450                             │
│                                     │
│ Revenue Sources:                    │
│ ├─ GEAR L2: $4,000 (32.1%)         │
│ ├─ 中文版指南: $3,200 (25.7%)       │
│ ├─ 技能商店: $2,500 (20.1%)         │
│ └─ 其他: $2,750 (22.1%)            │
│                                     │
│ 📈 +18.5% vs last month             │
└─────────────────────────────────────┘
```

**提交訊息：** `[Phase 2] Add RevenueCard component`

---

### 🔴 Task 4: 建立 Token Usage Card

**目標：** 建立 Token 消耗監控卡片

**位置：** `components/dashboard/TokenCard.tsx`

**規格：**
```
┌─────────────────────────────────────┐
│ 🎯 Token Usage            ● Live   │
├─────────────────────────────────────┤
│ Month    Today        Cost         │
│ 2.3M     45K          $450         │
│                                     │
│ Model Distribution:                 │
│ GLM-5        ████████████░░ 52%    │
│ MiniMax      ████████░░░░░░ 35%    │
│ Claude Haiku ███░░░░░░░░░░ 13%     │
│                                     │
│ API Status:                         │
│ 429 Errors: 0 | Latency: 1.2s      │
└─────────────────────────────────────┘
```

**提交訊息：** `[Phase 2] Add TokenCard component`

---

### 🟡 Task 5: 建立 Project Status Card

**目標：** 建立項目進度卡片

**位置：** `components/dashboard/ProjectCard.tsx`

**規格：**
```
┌─────────────────────────────────────┐
│ 🚀 Active Projects         4 total │
├─────────────────────────────────────┤
│ ● GEAR Course Factory               │
│   ████████████████░░░░ 80%         │
│   34/42 tasks • 2h ago              │
│                                     │
│ ● AI 晨讀系統                        │
│   ██████████████░░░░░░ 70%         │
│   Running • Daily 08:00             │
│                                     │
│ ● Delic Club                        │
│   ████████████░░░░░░░░ 60%         │
│   12 posts/week • 3h ago            │
│                                     │
│ ○ Ripple Foundation                 │
│   ██████░░░░░░░░░░░░░░ 30%         │
│   Planning • 1w ago                 │
└─────────────────────────────────────┘
```

**提交訊息：** `[Phase 2] Add ProjectCard component`

---

### 🟡 Task 6: 建立 Memory Health Card

**目標：** 建立記憶系統健康度卡片

**位置：** `components/dashboard/MemoryCard.tsx`

**規格：**
```
┌─────────────────────────────────────┐
│ 🧠 Memory System          ● Healthy │
├─────────────────────────────────────┤
│ 📚 Knowledge Graph                  │
│ Total Facts: 247                    │
│                                     │
│ 🔥 Hot (7d): 89                     │
│ 🌡️ Warm (8-30d): 98                │
│ ❄️ Cold (30+): 60                   │
│                                     │
│ 📝 Daily Notes: 21 days             │
│                                     │
│ 🔄 Nightly Extraction               │
│ Last run: Today 23:00               │
│ Extracted: +12 facts                │
└─────────────────────────────────────┘
```

**提交訊息：** `[Phase 2] Add MemoryCard component`

---

### 🟡 Task 7: 建立 Approval Queue Card

**目標：** 建立審批隊列卡片

**位置：** `components/dashboard/ApprovalCard.tsx`

**規格：**
```
┌─────────────────────────────────────┐
│ ✅ Approval Queue      3 pending   │
├─────────────────────────────────────┤
│ 📧 Email Draft                      │
│    Reply to partnership inquiry     │
│    10 min ago                       │
│    [Approve] [Edit]                 │
│                                     │
│ 📱 Social Post                      │
│    GEAR L2 promotion copy           │
│    2h ago                           │
│    [Approve] [Edit]                 │
│                                     │
│ 💰 Payment                          │
│    Skill store commission           │
│    1d ago                           │
│    [Approve] [Edit]                 │
└─────────────────────────────────────┘
```

**提交訊息：** `[Phase 2] Add ApprovalCard component`

---

### 🟡 Task 8: 建立 User Stats Card

**目標：** 建立用戶統計卡片

**位置：** `components/dashboard/UserCard.tsx`

**規格：**
```
┌─────────────────────────────────────┐
│ 👥 User Statistics                  │
├─────────────────────────────────────┤
│ Total     Paid        Conversion   │
│ 1,247     89          7.1%         │
│                                     │
│ 📊 Subscription Distribution        │
│ GEAR L2: 67 users                   │
│ 中文版指南: 45 purchases             │
│ 技能商店: 32 purchases               │
│                                     │
│ 📈 Weekly Growth                    │
│ Signups: +156                       │
│ Paid: +12                           │
└─────────────────────────────────────┘
```

**提交訊息：** `[Phase 2] Add UserCard component`

---

### 🔴 Task 9: 整合所有組件

**目標：** 將所有卡片整合到主頁

**位置：** `app/page.tsx`

**佈局：**
```tsx
<main className="min-h-screen bg-[#0a0a0a] p-8">
  {/* Header */}
  <header className="mb-8">
    <h1 className="text-4xl font-bold">🏠 DelicHubs Dashboard</h1>
    <p className="text-gray-400">Transparent AI Operations</p>
  </header>

  {/* Top Stats */}
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
    {/* 4 個統計卡片 */}
  </div>

  {/* Main Grid */}
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
    <RevenueCard />
    <TokenCard />
    <ProjectCard />
    <MemoryCard />
    <ApprovalCard />
    <UserCard />
  </div>
</main>
```

**提交訊息：** `[Phase 2] Integrate all dashboard components`

---

### 🔴 Task 10: 響應式優化

**目標：** 確保手機/平板正常顯示

**斷點：**
```
手機 (<768px): grid-cols-1
平板 (768px-1024px): grid-cols-2
桌面 (>1024px): grid-cols-2 (main grid)
                 grid-cols-4 (top stats)
```

**測試：**
```bash
# Chrome DevTools
# iPhone 14 Pro Max
# iPad Pro
# Desktop 1920x1080
```

**提交訊息：** `[Phase 4] Responsive design optimization`

---

### 🔴 Task 11: 部署準備

**目標：** 準備 Vercel 部署

**檢查清單：**
- [ ] `pnpm build` 成功
- [ ] 無 TypeScript 錯誤
- [ ] 無 ESLint 錯誤
- [ ] 圖片優化
- [ ] 環境變量設置

**提交訊息：** `[Phase 4] Prepare for deployment`

---

## 📝 提交規範

**格式：** `[Phase N] Description`

**範例：**
```
[Phase 1] Verify base setup
[Phase 2] Add RevenueCard component
[Phase 3] Connect real data API
[Phase 4] Deploy to Vercel
```

---

## 🎯 執行順序

```
Task 1  → Task 2  → Task 3
   ↓         ↓         ↓
Task 4  → Task 5  → Task 6
   ↓         ↓         ↓
Task 7  → Task 8  → Task 9
                      ↓
                 Task 10 → Task 11
```

---

**完成所有任務後，專案即可部署上線！** 🚀
