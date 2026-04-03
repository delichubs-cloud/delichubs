'use client';

import { useEffect, useState } from 'react';
import { getUserData } from '@/lib/dashboard-data';

export default function UserStatsCard() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const userData = await getUserData();
        setData(userData);
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
        <h2 className="text-lg sm:text-xl font-bold">👥 User Statistics</h2>
        <span className="text-xs text-gray-400">Daily update</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div>
          <p className="text-gray-400 text-xs">Total</p>
          <p className="text-xl sm:text-2xl font-bold">{data.total.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-gray-400 text-xs">Paid</p>
          <p className="text-xl sm:text-2xl font-bold text-green-400">{data.paid}</p>
        </div>
        <div>
          <p className="text-gray-400 text-xs">Conversion</p>
          <p className="text-xl sm:text-2xl font-bold text-purple-400">
            {data.conversion}%
          </p>
        </div>
      </div>

      <div className="mb-6">
        <p className="text-sm text-gray-400 mb-3">📊 Subscription Distribution</p>
        <div className="space-y-2">
          <div className="flex justify-between gap-3 text-sm">
            <span>GEAR L2</span>
            <span>{data.subscriptions.gear} users</span>
          </div>
          <div className="flex justify-between gap-3 text-sm">
            <span>中文版指南</span>
            <span>{data.subscriptions.guide} purchases</span>
          </div>
          <div className="flex justify-between gap-3 text-sm">
            <span>技能商店</span>
            <span>{data.subscriptions.skills} purchases</span>
          </div>
        </div>
      </div>

      <div className="p-3 bg-gray-800 rounded">
        <p className="text-sm text-gray-400 mb-2">📈 Weekly Growth</p>
        <div className="flex flex-col sm:flex-row sm:justify-between gap-2 text-sm">
          <span>
            Signups: <span className="text-green-400">+{data.weeklyNew.signups}</span>
          </span>
          <span>
            Paid: <span className="text-blue-400">+{data.weeklyNew.paid}</span>
          </span>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-700 text-xs text-gray-500">
        Data from subscriptions + metrics • Updated daily
      </div>
    </div>
  );
}
