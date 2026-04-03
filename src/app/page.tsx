import AgentSkillCard from "@/components/dashboard/AgentSkillCard";
import TimeBankCard from "@/components/dashboard/TimeBankCard";
import WeeklyDigestCard from "@/components/dashboard/WeeklyDigestCard";
import ActivityTerminalCard from "@/components/dashboard/ActivityTerminalCard";
import StatsOverview from "@/components/dashboard/StatsOverview";

// 所有组件现在都使用真实数据
import RevenueCard from "@/components/dashboard/RevenueCard";
import TokenUsageCard from "@/components/dashboard/TokenUsageCard";
import ProjectStatusCard from "@/components/dashboard/ProjectStatusCard";
import ApprovalQueueCard from "@/components/dashboard/ApprovalQueueCard";
import UserStatsCard from "@/components/dashboard/UserStatsCard";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold leading-tight mb-2">
            🏠 DelicHubs Dashboard
          </h1>
          <p className="text-sm sm:text-base text-gray-400">
            Transparent AI Operations • Powered by Supabase •{' '}
            <span className="text-green-400">✅ All Real Data</span>
          </p>
        </header>

        {/* 顶部统计卡片（真实数据） */}
        <StatsOverview />

        {/* 新组件：核心功能 */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xs px-2 py-1 bg-green-900 text-green-400 rounded">
              🟢 Core Features (Real Data)
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ActivityTerminalCard />
            <AgentSkillCard />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            <TimeBankCard />
            <WeeklyDigestCard />
          </div>
        </div>

        {/* 原有组件：全部使用真实数据 */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xs px-2 py-1 bg-blue-900 text-blue-400 rounded">
              🔵 Extended Metrics (Real Data)
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <RevenueCard />
            <TokenUsageCard />
            <ProjectStatusCard />
            <ApprovalQueueCard />
            <UserStatsCard />
          </div>
        </div>

        <div className="mt-12 text-center text-gray-500 text-sm">
          <p>Powered by OpenClaw • Built with Next.js + Supabase</p>
          <p className="mt-2">
            <a
              href="https://github.com/delichubs-cloud/delichubs"
              className="text-blue-400 hover:underline"
            >
              View Source on GitHub
            </a>
          </p>
          <p className="mt-2 text-xs text-gray-600">
            Last updated: {new Date().toLocaleString('zh-TW', { timeZone: 'Asia/Hong_Kong' })}
          </p>
        </div>
      </div>
    </main>
  );
}
