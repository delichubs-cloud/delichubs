# Codex 測試任務

**本地路徑：** `/Users/javis/projects/delichubs`
**GitHub：** https://github.com/delichubs-cloud/delichubs

---

## 📋 Task 13: 完整測試流程

### 目標

確保 Dashboard 在部署前功能完整、顯示正確。

---

## 1️⃣ 啟動開發服務器

```bash
cd /Users/javis/projects/delichubs
pnpm dev
```

確認服務器在 http://localhost:3000 啟動成功。

---

## 2️⃣ 功能測試

在瀏覽器打開 http://localhost:3000，檢查以下內容：

### 2.1 頁面標題
- [ ] 顯示 "🏠 DelicHubs Dashboard"
- [ ] 副標題顯示 "Transparent AI Operations"
- [ ] 顯示最後更新時間

### 2.2 頂部統計卡片（4 個）

**Card 1 - Total Revenue**
- [ ] 圖標顯示 💰
- [ ] 標題顯示 "Total Revenue"
- [ ] 數值顯示 "$12,450"
- [ ] 變化顯示 "+18.5% vs last month"
- [ ] 顏色為綠色

**Card 2 - Token Usage**
- [ ] 圖標顯示 🎯
- [ ] 標題顯示 "Token Usage"
- [ ] 數值顯示 "2.3M"
- [ ] 變化顯示 "45K today"
- [ ] 顏色為藍色

**Card 3 - Total Users**
- [ ] 圖標顯示 👥
- [ ] 標題顯示 "Total Users"
- [ ] 數值顯示 "1,247"
- [ ] 變化顯示 "89 paid"
- [ ] 顏色為紫色

**Card 4 - Active Days**
- [ ] 圖標顯示 ⏰
- [ ] 標題顯示 "Active Days"
- [ ] 數值顯示 "21"
- [ ] 變化顯示 "tracking days"
- [ ] 顏色為黃色

---

### 2.3 主要卡片（6 個）

**Revenue Card**
- [ ] 標題顯示 "💰 Revenue Analysis"
- [ ] 顯示總收入 "$12,450"
- [ ] 顯示 4 個收入來源
  - [ ] GEAR L2: $4,000 (32.1%)
  - [ ] 中文版指南: $3,200 (25.7%)
  - [ ] 技能商店: $2,500 (20.1%)
  - [ ] 其他: $2,750 (22.1%)
- [ ] 顯示成長指示 "+18.5% vs last month"

**Token Card**
- [ ] 標題顯示 "🎯 Token Usage"
- [ ] 顯示 Live 指示器（綠點）
- [ ] 顯示 3 個統計
  - [ ] Month Total: 2.3M
  - [ ] Today: 45K
  - [ ] Cost: $450
- [ ] 顯示 3 個模型分佈（帶進度條）
  - [ ] GLM-5: 52%
  - [ ] MiniMax: 35%
  - [ ] Claude Haiku: 13%
- [ ] 顯示 API 狀態
  - [ ] 429 Errors: 0
  - [ ] Latency: 1.2s
  - [ ] Quota: 87%

**Project Card**
- [ ] 標題顯示 "🚀 Active Projects"
- [ ] 顯示 "4 total"
- [ ] 顯示 4 個項目
  - [ ] GEAR Course Factory (80%, active)
  - [ ] AI 晨讀系統 (70%, running)
  - [ ] Delic Club (60%, active)
  - [ ] Ripple Foundation (30%, planning)
- [ ] 每個項目顯示進度條
- [ ] 每個項目顯示狀態指示器（顏色點）

**Memory Card**
- [ ] 標題顯示 "🧠 Memory System"
- [ ] 顯示 "Healthy" 徽章
- [ ] 顯示 Knowledge Graph
  - [ ] Total Facts: 247
  - [ ] 🔥 Hot (7d): 89
  - [ ] 🌡️ Warm (8-30d): 98
  - [ ] ❄️ Cold (30+): 60
- [ ] 顯示 Daily Notes: 21 days
- [ ] 顯示 Nightly Extraction
  - [ ] Last run: Today 23:00
  - [ ] Extracted: +12 facts

**Approval Card**
- [ ] 標題顯示 "✅ Approval Queue"
- [ ] 顯示 "3 pending" 徽章
- [ ] 顯示 3 個審批項目
  - [ ] 📧 Email Draft
  - [ ] 📱 Social Post
  - [ ] 💰 Payment
- [ ] 每個項目顯示 [Approve] [Edit] 按鈕

**User Card**
- [ ] 標題顯示 "👥 User Statistics"
- [ ] 顯示 3 個主要統計
  - [ ] Total Users: 1,247
  - [ ] Paid Users: 89
  - [ ] Conversion: 7.1%
- [ ] 顯示 Subscription Distribution
  - [ ] GEAR L2: 67 users
  - [ ] 中文版指南: 45 purchases
  - [ ] 技能商店: 32 purchases
- [ ] 顯示 Weekly Growth
  - [ ] Signups: +156
  - [ ] Paid: +12

---

### 2.4 頁腳
- [ ] 顯示 "Powered by OpenClaw • Built with Next.js"
- [ ] 顯示 GitHub 連結（可點擊）

---

## 3️⃣ 響應式測試

使用 Chrome DevTools 測試不同設備：

### 3.1 手機模式（<768px）
```
設備：iPhone 14 Pro Max (430px)
```
- [ ] 頂部卡片：1 列（grid-cols-1）
- [ ] 主卡片：1 列（grid-cols-1）
- [ ] 文字大小適中
- [ ] 無水平滾動
- [ ] 所有內容可見

### 3.2 平板模式（768-1024px）
```
設備：iPad Pro (1024px)
```
- [ ] 頂部卡片：2 列（grid-cols-2）
- [ ] 主卡片：1 列（grid-cols-1）
- [ ] 佈局平衡

### 3.3 桌面模式（>1024px）
```
設備：Desktop (1920x1080)
```
- [ ] 頂部卡片：4 列（grid-cols-4）
- [ ] 主卡片：2 列（grid-cols-2）
- [ ] 最大寬度：max-w-7xl
- [ ] 居中對齊

---

## 4️⃣ 視覺檢查

### 4.1 顏色
- [ ] 背景為深黑色 (#0a0a0a)
- [ ] 卡片背景為灰色 (bg-gray-900)
- [ ] 文字顏色正確
  - [ ] 主文字：白色
  - [ ] 次文字：灰色 (text-gray-400)
  - [ ] 標籤：淺灰色 (text-gray-500)
- [ ] 強調色正確
  - [ ] 綠色：text-green-400
  - [ ] 藍色：text-blue-400
  - [ ] 紫色：text-purple-400
  - [ ] 黃色：text-yellow-400

### 4.2 間距
- [ ] 卡片內距：p-6 (1.5rem)
- [ ] 卡片間距：gap-6 (1.5rem)
- [ ] 頁面內距：p-4 sm:p-6 lg:p-8
- [ ] 標題間距：mb-8

### 4.3 邊框和圓角
- [ ] 卡片有邊框 (border-gray-800)
- [ ] 卡片有圓角 (rounded-lg)
- [ ] 徽章有圓角 (rounded)

### 4.4 動畫（如果有）
- [ ] Live 指示器閃爍 (animate-pulse)
- [ ] 進度條過渡 (transition-all)
- [ ] Hover 效果 (hover:border-gray-700)

---

## 5️⃣ Console 檢查

打開 Chrome DevTools Console，檢查：

- [ ] 無 JavaScript 錯誤（紅色）
- [ ] 無 React 警告（黃色）
- [ ] 無 404 資源錯誤
- [ ] 無 CORS 錯誤

---

## 6️⃣ 性能檢查

### 6.1 Lighthouse 測試

```bash
# 安裝 Lighthouse（如果需要）
npm install -g lighthouse

# 運行測試
lighthouse http://localhost:3000 --view
```

檢查指標：
- [ ] Performance > 90
- [ ] Accessibility > 90
- [ ] Best Practices > 90
- [ ] SEO > 90

### 6.2 網絡請求

打開 DevTools Network tab：
- [ ] 無阻塞資源
- [ ] JS bundle < 100KB
- [ ] 無大型圖片
- [ ] 無重複請求

---

## 7️⃣ 問題報告格式

如果發現問題，按以下格式報告：

```markdown
## 問題 #[N]: [簡短描述]

**嚴重程度：** 🔴 高 / 🟡 中 / 🟢 低

**重現步驟：**
1. 打開 http://localhost:3000
2. 縮小窗口到手機尺寸
3. 觀察頂部卡片

**預期結果：**
卡片應該顯示為 1 列

**實際結果：**
卡片顯示為 2 列

**截圖：**
[附上截圖]

**設備信息：**
- 設備：iPhone 14 Pro Max
- 瀏覽器：Chrome 122
- 分辨率：430px

**建議修復：**
修改 app/page.tsx 的 grid class
```

---

## 8️⃣ 測試完成報告

完成所有測試後，提交報告：

```markdown
## 測試報告

**測試日期：** 2026-03-21
**測試人員：** Codex
**測試環境：** 
- Node.js: [version]
- pnpm: [version]
- 瀏覽器: Chrome [version]

### 功能測試
- ✅ 頁面標題
- ✅ 頂部統計卡片（4/4）
- ✅ 主要卡片（6/6）
- ✅ 頁腳

### 響應式測試
- ✅ 手機模式
- ✅ 平板模式
- ✅ 桌面模式

### 視覺檢查
- ✅ 顏色
- ✅ 間距
- ✅ 邊框和圓角

### Console 檢查
- ✅ 無錯誤

### 性能檢查
- ✅ Lighthouse > 90（如適用）

### 問題列表
[列出發現的問題，如果沒有則寫 "無"]

### 結論
[通過 / 不通過]

如果通過，建議進行下一步：部署到 Vercel
```

---

## 9️⃣ 完成後操作

### 如果測試通過：
```bash
# 提交測試報告
git add docs/CODEX-TESTING.md
git commit -m "[Phase 4] Complete testing - all tests passed"
git push
```

### 如果測試失敗：
```bash
# 提交問題報告
git add docs/CODEX-TESTING.md
git commit -m "[Phase 4] Testing report - issues found"
git push

# 然後修復問題
# 重新測試
```

---

## 📝 注意事項

1. **不要跳過任何測試項目**
2. **記錄所有發現的問題**
3. **如果無法測試某項，標記為 "N/A" 並說明原因**
4. **截圖保存到 docs/screenshots/ 目錄**
5. **測試完成後，確保停止開發服務器（Ctrl+C）**

---

**開始測試！** 🚀
