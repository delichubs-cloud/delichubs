'use client'

export default function MemoryHealthCard() {
  const memoryData = {
    totalFacts: 247,
    hotFacts: 89,
    warmFacts: 98,
    coldFacts: 60,
    dailyNotes: 21,
    lastExtraction: '今日 23:00',
    extractionFacts: 12
  }

  return (
    <div className="bg-gray-900 rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">🧠 记忆系统</h2>
        <span className="text-xs px-2 py-1 bg-green-900 text-green-400 rounded">健康</span>
      </div>

      {/* Knowledge Graph */}
      <div className="mb-6">
        <p className="text-sm text-gray-400 mb-3">📚 Knowledge Graph</p>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-2xl font-bold">{memoryData.totalFacts}</p>
            <p className="text-xs text-gray-500">总事实数</p>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>🔥 热点 (7天)</span>
              <span className="text-orange-400">{memoryData.hotFacts}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>🌡️ 温点 (8-30天)</span>
              <span className="text-yellow-400">{memoryData.warmFacts}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>❄️ 冷点 (30+天)</span>
              <span className="text-blue-400">{memoryData.coldFacts}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Daily Notes */}
      <div className="mb-6">
        <p className="text-sm text-gray-400 mb-2">📝 Daily Notes</p>
        <p className="text-lg">
          <span className="font-bold">{memoryData.dailyNotes}</span>
          <span className="text-gray-500 text-sm ml-2">天</span>
        </p>
      </div>

      {/* Nightly Extraction */}
      <div className="p-3 bg-gray-800 rounded">
        <p className="text-sm text-gray-400 mb-1">🔄 夜间提取</p>
        <div className="flex justify-between text-sm">
          <span>上次执行: {memoryData.lastExtraction}</span>
          <span className="text-green-400">+{memoryData.extractionFacts} 事实</span>
        </div>
      </div>
    </div>
  )
}
