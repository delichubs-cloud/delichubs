'use client';

import { useEffect, useState } from 'react';
import { Activity } from 'lucide-react';
import { getTokenData } from '@/lib/dashboard-data';

export default function TokenUsageCard() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const tokenData = await getTokenData();
        setData(tokenData);
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

  return (
    <div className="bg-gray-900 rounded-lg p-5 sm:p-6 border border-gray-800">
      <div className="flex items-center justify-between gap-3 mb-4">
        <h2 className="text-lg sm:text-xl font-bold flex items-center gap-2">
          <Activity className="w-5 h-5 text-blue-400" />
          🎯 Token Usage
        </h2>
        <div className="flex items-center gap-1 shrink-0">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-xs text-gray-400">Estimated</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div>
          <p className="text-gray-400 text-xs">Month</p>
          <p className="text-xl sm:text-2xl font-bold">{data.monthTotal}</p>
        </div>
        <div>
          <p className="text-gray-400 text-xs">Today</p>
          <p className="text-xl sm:text-2xl font-bold">{data.today}</p>
        </div>
        <div>
          <p className="text-gray-400 text-xs">Cost</p>
          <p className="text-xl sm:text-2xl font-bold text-yellow-400">
            ${data.cost}
          </p>
        </div>
      </div>

      <div className="space-y-3">
        <p className="text-sm text-gray-400">Model Distribution</p>
        {data.models.map((model: any) => (
          <div key={model.name}>
            <div className="flex items-start justify-between gap-3 text-sm mb-1">
              <span className="min-w-0">{model.name}</span>
              <span className="shrink-0 text-right">
                {model.tokens} ({model.percent}%)
              </span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div
                className="bg-blue-400 h-2 rounded-full"
                style={{ width: `${model.percent}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-gray-400">
        <div>429 Errors: {data.apiStatus.errors429}</div>
        <div>Latency: {data.apiStatus.avgLatency}</div>
        <div>Quota: {data.apiStatus.quotaRemaining}%</div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-700 text-xs text-gray-500">
        Estimated from task_logs • Updated daily
      </div>
    </div>
  );
}
