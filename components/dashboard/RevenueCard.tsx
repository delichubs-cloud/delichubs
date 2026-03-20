'use client'

import { TrendingUp, DollarSign } from 'lucide-react'

export default function RevenueCard() {
  const revenueData = {
    total: 12450,
    monthly: [
      { month: 'Jan', amount: 2000 },
      { month: 'Feb', amount: 3500 },
      { month: 'Mar', amount: 4200 },
      { month: 'Apr', amount: 2750 },
    ],
    sources: [
      { name: 'GEAR L2', amount: 4000, percent: 32.1 },
      { name: '中文版指南', amount: 3200, percent: 25.7 },
      { name: '技能商店', amount: 2500, percent: 20.1 },
      { name: '其他', amount: 2750, percent: 22.1 },
    ]
  }

  return (
    <div className="bg-gray-900 rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <DollarSign className="w-5 h-5 text-green-400" />
          💰 收入分析
        </h2>
        <span className="text-xs text-gray-400">实时更新</span>
      </div>

      {/* Total Revenue */}
      <div className="mb-6">
        <p className="text-gray-400 text-sm">总收入（净额）</p>
        <p className="text-4xl font-bold text-green-400">
          ${revenueData.total.toLocaleString()}
        </p>
      </div>

      {/* Revenue Sources */}
      <div className="space-y-3">
        <p className="text-sm text-gray-400">收入来源</p>
        {revenueData.sources.map((source, idx) => (
          <div key={idx} className="flex items-center justify-between">
            <span className="text-sm">{source.name}</span>
            <div className="flex items-center gap-2">
              <span className="text-sm font-mono">${source.amount.toLocaleString()}</span>
              <span className="text-xs text-gray-500">({source.percent}%)</span>
            </div>
          </div>
        ))}
      </div>

      {/* Growth Indicator */}
      <div className="mt-6 flex items-center gap-2 text-sm text-green-400">
        <TrendingUp className="w-4 h-4" />
        <span>+18.5% vs 上月</span>
      </div>
    </div>
  )
}
