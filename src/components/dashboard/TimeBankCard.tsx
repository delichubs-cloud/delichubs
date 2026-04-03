'use client';

import { useEffect, useState } from 'react';
import { getTaskLogs, getTotalTimeSaved, type TaskLog } from '@/lib/supabase-client';

export default function TimeBankCard() {
  const [tasks, setTasks] = useState<TaskLog[]>([]);
  const [totalTime, setTotalTime] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const [tasksData, total] = await Promise.all([
          getTaskLogs(10),
          getTotalTimeSaved()
        ]);
        setTasks(tasksData);
        setTotalTime(total);
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
          <div className="h-20 bg-gray-700 rounded mb-4"></div>
          <div className="space-y-2">
            <div className="h-3 bg-gray-700 rounded"></div>
            <div className="h-3 bg-gray-700 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-900 rounded-lg p-5 sm:p-6 border border-red-800">
        <p className="text-red-400">Error: {error}</p>
      </div>
    );
  }

  const hours = Math.floor(totalTime / 60);
  const minutes = totalTime % 60;

  return (
    <div className="bg-gray-900 rounded-lg p-5 sm:p-6 border border-gray-800">
      <div className="flex items-center justify-between gap-3 mb-4">
        <h2 className="text-lg sm:text-xl font-bold">⏱️ Time Bank</h2>
        <span className="text-xs text-green-400">Live</span>
      </div>

      <div className="mb-6 text-center py-4 bg-gray-800 rounded">
        <p className="text-gray-400 text-xs mb-1">Total Time Saved</p>
        <p className="text-4xl font-bold text-green-400">
          {hours > 0 ? `${hours}h ` : ''}{minutes}m
        </p>
        <p className="text-xs text-gray-500 mt-1">{tasks.length} tasks completed</p>
      </div>

      <div className="mb-4">
        <p className="text-sm text-gray-400 mb-3">Recent Tasks</p>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="flex items-start justify-between gap-2 p-2 bg-gray-800 rounded text-sm"
            >
              <div className="min-w-0 flex-1">
                <p className="truncate">{task.task_name}</p>
                {task.agent_used && (
                  <p className="text-xs text-gray-500">by {task.agent_used}</p>
                )}
              </div>
              <span className="text-green-400 shrink-0 text-xs">
                {task.duration}m
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-700 text-xs text-gray-500">
        Data from Supabase • Updated in real-time
      </div>
    </div>
  );
}
