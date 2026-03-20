import ApprovalQueueCard from "@/components/dashboard/ApprovalQueueCard";
import MemoryHealthCard from "@/components/dashboard/MemoryHealthCard";
import ProjectStatusCard from "@/components/dashboard/ProjectStatusCard";
import RevenueCard from "@/components/dashboard/RevenueCard";
import TokenUsageCard from "@/components/dashboard/TokenUsageCard";
import UserStatsCard from "@/components/dashboard/UserStatsCard";
import StatCard from "@/components/ui/StatCard";
import { dashboardData } from "@/lib/mockData";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold leading-tight mb-2">
            🏠 DelicHubs Dashboard
          </h1>
          <p className="text-sm sm:text-base text-gray-400">
            Transparent AI Operations • Last updated:{" "}
            {new Date(dashboardData.lastUpdated).toLocaleString("zh-TW", {
              timeZone: "Asia/Hong_Kong",
            })}
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon="💰"
            title="Total Revenue"
            value={`$${dashboardData.revenue.total.toLocaleString()}`}
            change={`+${dashboardData.revenue.growth}% vs last month`}
            color="green"
          />
          <StatCard
            icon="🎯"
            title="Token Usage"
            value={dashboardData.tokens.monthTotal}
            change={`${dashboardData.tokens.today} today`}
            color="blue"
          />
          <StatCard
            icon="👥"
            title="Total Users"
            value={dashboardData.users.total.toLocaleString()}
            change={`${dashboardData.users.paid} paid`}
            color="purple"
          />
          <StatCard
            icon="⏰"
            title="Active Days"
            value={dashboardData.memory.dailyNotes}
            change="tracking days"
            color="yellow"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RevenueCard data={dashboardData.revenue} />
          <TokenUsageCard data={dashboardData.tokens} />
          <ProjectStatusCard data={dashboardData.projects} />
          <MemoryHealthCard data={dashboardData.memory} />
          <ApprovalQueueCard data={dashboardData.approvals} />
          <UserStatsCard data={dashboardData.users} />
        </div>

        <div className="mt-12 text-center text-gray-500 text-sm">
          <p>Powered by OpenClaw • Built with Next.js</p>
          <p className="mt-2">
            <a
              href="https://github.com/delichubs-cloud/delichubs"
              className="text-blue-400 hover:underline"
            >
              View Source on GitHub
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}
