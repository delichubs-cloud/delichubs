'use client'

export default function UserStatsCard() {
  const userData = {
    total: 1247,
    paid: 89,
    conversion: 7.1,
    subscriptions: {
      gear: 67,
      guide: 45,
      skills: 32
    },
    weeklyNew: {
      signups: 156,
      paid: 12
    }
  }

  return (
    <div className="bg-gray-900 rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">👥 用户数据</h2>
        <span className="text-xs text-gray-400">实时</span>
      </div>

      {/* Main Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div>
          <p className="text-gray-400 text-xs">总用户</p>
          <p className="text-2xl font-bold">{userData.total.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-gray-400 text-xs">付费用户</p>
          <p className="text-2xl font-bold text-green-400">{userData.paid}</p>
        </div>
        <div>
          <p className="text-gray-400 text-xs">转化率</p>
          <p className="text-2xl font-bold text-purple-400">{userData.conversion}%</p>
        </div>
      </div>

      {/* Subscription Distribution */}
      <div className="mb-6">
        <p className="text-sm text-gray-400 mb-3">📊 订阅分布</p>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>GEAR L2</span>
            <span>{userData.subscriptions.gear} 用户</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>中文版指南</span>
            <span>{userData.subscriptions.guide} 购买</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>技能商店</span>
            <span>{userData.subscriptions.skills} 购买</span>
          </div>
        </div>
      </div>

      {/* Weekly Growth */}
      <div className="p-3 bg-gray-800 rounded">
        <p className="text-sm text-gray-400 mb-2">📈 本周新增</p>
        <div className="flex justify-between text-sm">
          <span>注册: <span className="text-green-400">+{userData.weeklyNew.signups}</span></span>
          <span>付费: <span className="text-blue-400">+{userData.weeklyNew.paid}</span></span>
        </div>
      </div>
    </div>
  )
}
