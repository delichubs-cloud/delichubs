'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase-client';

interface ActivityLog {
  id: string;
  type: string;
  content: string;
  metadata?: {
    agent?: string;
    duration?: number;
  };
  created_at: string;
}

export default function ActivityTerminalCard() {
  const [activities, setActivities] = useState<ActivityLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data, error } = await supabase
          .from('activity_logs')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(10);

        if (error) throw error;
        setActivities(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load data');
      } finally {
        setLoading(false);
      }
    }

    fetchData();

    // 自动刷新（每 30 秒）
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="bg-gray-900 rounded-lg p-5 sm:p-6 border border-gray-800">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-700 rounded w-1/3 mb-4"></div>
          <div className="space-y-2">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-4 bg-gray-700 rounded"></div>
            ))}
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

  const typeIcons: Record<string, string> = {
    'conversation': '💬',
    'task': '✅',
    'skill_call': '⚡',
    'error': '❌'
  };

  const typeColors: Record<string, string> = {
    'conversation': 'text-blue-400',
    'task': 'text-green-400',
    'skill_call': 'text-yellow-400',
    'error': 'text-red-400'
  };

  return (
    <div className="bg-gray-900 rounded-lg p-5 sm:p-6 border border-gray-800">
      <div className="flex items-center justify-between gap-3 mb-4">
        <h2 className="text-lg sm:text-xl font-bold">💻 Terminal</h2>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-xs text-gray-400">Live</span>
        </div>
      </div>

      <div className="bg-black rounded p-3 font-mono text-xs sm:text-sm max-h-96 overflow-y-auto">
        <div className="text-gray-500 mb-2">
          $ openclaw activity logs --tail 10
        </div>

        <div className="space-y-2">
          {activities.map((activity) => {
            const time = new Date(activity.created_at);
            const timeStr = time.toLocaleTimeString('zh-TW', {
              hour: '2-digit',
              minute: '2-digit'
            });

            return (
              <div
                key={activity.id}
                className="flex items-start gap-2"
              >
                <span className="text-gray-500 shrink-0">[{timeStr}]</span>
                <span className={`shrink-0 ${typeColors[activity.type] || 'text-gray-400'}`}>
                  {typeIcons[activity.type] || '•'}
                </span>
                <span className="text-green-400 truncate flex-1">
                  {activity.content}
                </span>
                {activity.metadata?.agent && (
                  <span className="text-gray-600 shrink-0 text-xs">
                    @{activity.metadata.agent}
                  </span>
                )}
              </div>
            );
          })}
        </div>

        <div className="text-gray-500 mt-2">
          $ <span className="animate-pulse">_</span>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between text-xs">
        <span className="text-gray-500">
          {activities.length} recent activities
        </span>
        <span className="text-gray-500">
          Auto-refresh: 30s
        </span>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-700 text-xs text-gray-500">
        Data from Supabase • 5 min delay for privacy
      </div>
    </div>
  );
}
