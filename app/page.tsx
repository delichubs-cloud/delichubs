import RevenueCard from '@/components/dashboard/RevenueCard'
import TokenUsageCard from '@/components/dashboard/TokenUsageCard'
import ProjectStatusCard from '@/components/dashboard/ProjectStatusCard'
import MemoryHealthCard from '@/components/dashboard/MemoryHealthCard'
import ApprovalQueueCard from '@/components/dashboard/ApprovalQueueCard'
import UserStatsCard from '@/components/dashboard/UserStatsCard'

export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">
            🏠 DelicHubs Dashboard
          </h1>
          <p className="text-gray-400">
            Transparent AI Operations • Last updated: {new Date().toLocaleString('zh-TW', { timeZone: 'Asia/Hong_Kong' })}
          </p>
        </div>

        {/* Top Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-gray-900 rounded-lg p-6">
            <p className="text-gray-400 text-sm">💰 Total Revenue</p>
            <p className="text-3xl font-bold text-green-400">$12,450</p>
            <p className="text-sm text-gray-500 mt-2">+$2,300 this month</p>
          </div>
          
          <div className="bg-gray-900 rounded-lg p-6">
            <p className="text-gray-400 text-sm">🎯 Token Usage</p>
            <p className="text-3xl font-bold text-blue-400">2.3M</p>
            <p className="text-sm text-gray-500 mt-2">45K today</p>
          </div>
          
          <div className="bg-gray-900 rounded-lg p-6">
            <p className="text-gray-400 text-sm">👥 Users</p>
            <p className="text-3xl font-bold text-purple-400">156</p>
            <p className="text-sm text-gray-500 mt-2">89 paid</p>
          </div>
          
          <div className="bg-gray-900 rounded-lg p-6">
            <p className="text-gray-400 text-sm">⏰ Active Days</p>
            <p className="text-3xl font-bold text-yellow-400">47</p>
            <p className="text-sm text-gray-500 mt-2">days</p>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <RevenueCard />
          <TokenUsageCard />
          <ProjectStatusCard />
          <MemoryHealthCard />
          <ApprovalQueueCard />
          <UserStatsCard />
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
  )
}
