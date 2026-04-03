'use client';

import { useEffect, useState } from 'react';
import { getProjectData } from '@/lib/dashboard-data';

export default function ProjectStatusCard() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const projectData = await getProjectData();
        setData(projectData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load data');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="bg-gray-900 rounded-lg p-5 sm:p-6 border border-gray-800">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-700 rounded w-1/3 mb-4"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-700 rounded"></div>
            <div className="h-4 bg-gray-700 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="bg-gray-900 rounded-lg p-5 sm:p-6 border border-red-800">
        <p className="text-red-400">Error: {error}</p>
      </div>
    );
  }

  const statusColors: Record<string, string> = {
    active: 'bg-green-400',
    running: 'bg-blue-400',
    planning: 'bg-yellow-400',
    paused: 'bg-gray-400'
  };

  return (
    <div className="bg-gray-900 rounded-lg p-5 sm:p-6 border border-gray-800">
      <div className="flex items-center justify-between gap-3 mb-4">
        <h2 className="text-lg sm:text-xl font-bold">🚀 Active Projects</h2>
        <span className="text-xs text-gray-400 shrink-0">{data.total} total</span>
      </div>

      <div className="space-y-4">
        {data.projects.map((project: any) => (
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

      <div className="mt-4 pt-4 border-t border-gray-700 text-xs text-gray-500">
        Data from javis_claw_logs • Updated daily
      </div>
    </div>
  );
}
