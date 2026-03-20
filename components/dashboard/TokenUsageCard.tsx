'use client'

import { Activity } from 'lucide-react'

export default function TokenUsageCard() {
  const tokenData = {
    total: '2.3M',
    today: '45K',
    cost: 450,
    models: [
      { name: 'GLM-5', tokens: '1.2M', percent: 52, cost: 180 },
      { name: 'MiniMax', tokens: '0.8M', percent: 35, cost: 200 },
      { name: 'Claude Haiku', tokens: '0.3M', percent: 13, cost: 70 },
    ],
    apiStatus: {
      errors429: 0,
      avgLatency: '1.2s',
      quotaRemaining: 87
    }
  }

  return (
    <div className="bg-gray-900 rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <Activity className="w-5 h-5 text-blue-400" />
          🎯 Token 消耗
        </h2>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-xs text-gray-400">在线</span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div>
          <p className="text-gray-400 text-xs">本月总消耗</p>
          <p className="text-2xl font-bold">{tokenData.total}</p>
        </div>
        <div>
          <p className="text-gray-400 text-xs">今日消耗</p>
          <p className="text-2xl font-bold">{tokenData.today}</p>
        </div>
        <div>
          <p className="text-gray-400 text-xs">成本估算</p>
          <p className="text-2xl font-bold text-yellow-400">${tokenData.cost}</p>
        </div>
      </div>

      {/* Model Distribution */}
      <div className="space-y-3">
        <p className="text-sm text-gray-400">按模型分布</p>
        {tokenData.models.map((model, idx) => (
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
        <div>429 错误: {tokenData.apiStatus.errors429}</div>
        <div>延迟: {tokenData.apiStatus.avgLatency}</div>
        <div>配额: {tokenData.apiStatus.quotaRemaining}%</div>
      </div>
    </div>
  )
}
