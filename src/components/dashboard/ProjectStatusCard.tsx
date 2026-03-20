import type { ProjectData, ProjectStatus } from "@/types";

interface ProjectStatusCardProps {
  data: ProjectData;
}

const statusColors: Record<ProjectStatus, string> = {
  active: "bg-green-400",
  running: "bg-blue-400",
  planning: "bg-yellow-400",
  paused: "bg-gray-400",
};

export default function ProjectStatusCard({ data }: ProjectStatusCardProps) {
  return (
    <div className="bg-gray-900 rounded-lg p-5 sm:p-6 border border-gray-800">
      <div className="flex items-center justify-between gap-3 mb-4">
        <h2 className="text-lg sm:text-xl font-bold">🚀 Active Projects</h2>
        <span className="text-xs text-gray-400 shrink-0">{data.total} total</span>
      </div>

      <div className="space-y-4">
        {data.projects.map((project) => (
          <div key={project.id}>
            <div className="flex items-start justify-between gap-3 mb-2">
              <div className="flex items-center gap-2 min-w-0">
                <div
                  className={`w-2 h-2 rounded-full shrink-0 ${statusColors[project.status]}`}
                />
                <span className="font-medium text-sm sm:text-base">{project.name}</span>
              </div>
              <span className="text-sm text-gray-400 shrink-0">{project.tasks}</span>
            </div>

            <div className="w-full bg-gray-700 rounded-full h-2 mb-1">
              <div
                className="bg-purple-400 h-2 rounded-full transition-all duration-500"
                style={{ width: `${project.progress}%` }}
              />
            </div>

            <div className="flex justify-between gap-3 text-xs text-gray-500">
              <span>{project.progress}% complete</span>
              <span>{project.lastUpdate}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
