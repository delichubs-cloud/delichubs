'use client'

export default function ProjectStatusCard() {
  const projects = [
    { 
      name: 'GEAR Course Factory', 
      progress: 80, 
      tasks: '34/42',
      status: 'active',
      lastUpdate: '2 小时前'
    },
    { 
      name: 'AI 晨读系统', 
      progress: 70, 
      tasks: '运行中',
      status: 'running',
      lastUpdate: '每日 08:00'
    },
    { 
      name: 'Delic Club', 
      progress: 60, 
      tasks: '12篇/週',
      status: 'active',
      lastUpdate: '3 小时前'
    },
    { 
      name: 'Ripple Foundation', 
      progress: 30, 
      tasks: '规划中',
      status: 'planning',
      lastUpdate: '1 周前'
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-400'
      case 'running': return 'bg-blue-400'
      case 'planning': return 'bg-yellow-400'
      default: return 'bg-gray-400'
    }
  }

  return (
    <div className="bg-gray-900 rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">🚀 活跃项目</h2>
        <span className="text-xs text-gray-400">{projects.length} 个项目</span>
      </div>

      <div className="space-y-4">
        {projects.map((project, idx) => (
          <div key={idx}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${getStatusColor(project.status)}`}></div>
                <span className="font-medium">{project.name}</span>
              </div>
              <span className="text-sm text-gray-400">{project.tasks}</span>
            </div>
            
            <div className="w-full bg-gray-700 rounded-full h-2 mb-1">
              <div 
                className="bg-purple-400 h-2 rounded-full transition-all duration-500"
                style={{ width: `${project.progress}%` }}
              ></div>
            </div>
            
            <div className="flex justify-between text-xs text-gray-500">
              <span>{project.progress}% 完成</span>
              <span>{project.lastUpdate}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
