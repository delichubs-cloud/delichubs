'use client'

export default function ApprovalQueueCard() {
  const pendingItems = [
    { id: 1, type: 'email', title: '回复合作询问', time: '10 分钟前' },
    { id: 2, type: 'social', title: 'GEAR L2 推广文案', time: '2 小时前' },
    { id: 3, type: 'payment', title: '技能商店分成结算', time: '1 天前' },
  ]

  const getIcon = (type: string) => {
    switch (type) {
      case 'email': return '📧'
      case 'social': return '📱'
      case 'payment': return '💰'
      default: return '📄'
    }
  }

  return (
    <div className="bg-gray-900 rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">✅ 审批队列</h2>
        <span className="bg-yellow-900 text-yellow-400 text-xs px-2 py-1 rounded">
          {pendingItems.length} 待审批
        </span>
      </div>

      <div className="space-y-3">
        {pendingItems.map((item) => (
          <div key={item.id} className="flex items-center justify-between p-3 bg-gray-800 rounded hover:bg-gray-700 transition cursor-pointer">
            <div className="flex items-center gap-3">
              <span className="text-xl">{getIcon(item.type)}</span>
              <div>
                <p className="font-medium">{item.title}</p>
                <p className="text-xs text-gray-500">{item.time}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="text-xs px-3 py-1 bg-green-600 hover:bg-green-500 rounded">
                批准
              </button>
              <button className="text-xs px-3 py-1 bg-gray-600 hover:bg-gray-500 rounded">
                修改
              </button>
            </div>
          </div>
        ))}
      </div>

      {pendingItems.length === 0 && (
        <p className="text-center text-gray-500 py-8">
          ✨ 所有任务已完成
        </p>
      )}
    </div>
  )
}
