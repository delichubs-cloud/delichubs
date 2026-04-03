'use client';

import { useEffect, useState } from 'react';
import { getMemoryData } from '@/lib/dashboard-data';

export default function MemoryHealthCard() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const memoryData = await getMemoryData();
        setData(memoryData);
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
        <h2 className="text-lg sm:text-xl font-bold">🧠 Memory System</h2>
        <span className="text-xs px-2 py-1 bg-green-900 text-green-400 rounded">
          Healthy
        </span>
      </div>

      <div className="mb-6">
        <p className="text-sm text-gray-400 mb-3">📚 Knowledge Graph</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <p className="text-2xl font-bold">{data.totalFacts}</p>
            <p className="text-xs text-gray-500">Total Facts</p>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between gap-3 text-sm">
              <span>🔥 Hot (7d)</span>
              <span className="text-orange-400">{data.hotFacts}</span>
            </div>
            <div className="flex justify-between gap-3 text-sm">
              <span>🌡️ Warm (8-30d)</span>
              <span className="text-yellow-400">{data.warmFacts}</span>
            </div>
            <div className="flex justify-between gap-3 text-sm">
              <span>❄️ Cold (30+)</span>
              <span className="text-blue-400">{data.coldFacts}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <p className="text-sm text-gray-400 mb-2">📝 Daily Notes</p>
        <p className="text-lg">
          <span className="font-bold">{data.dailyNotes}</span>
          <span className="text-gray-500 text-sm ml-2">days</span>
        </p>
      </div>

      <div className="p-3 bg-gray-800 rounded">
        <p className="text-sm text-gray-400 mb-1">🔄 Nightly Extraction</p>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-sm">
          <span>Last run: {data.lastExtraction}</span>
          <span className="text-green-400">+{data.extractedFacts} facts</span>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-700 text-xs text-gray-500">
        Data from javis_claw_logs + task_logs • Updated daily
      </div>
    </div>
  );
}
