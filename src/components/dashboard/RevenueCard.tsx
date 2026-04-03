'use client';

import { useEffect, useState } from 'react';
import { DollarSign, TrendingUp } from 'lucide-react';
import { getRevenueData } from '@/lib/dashboard-data';

export default function RevenueCard() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const revenueData = await getRevenueData();
        setData(revenueData);
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
          <div className="h-12 bg-gray-700 rounded mb-4"></div>
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
          <DollarSign className="w-5 h-5 text-green-400" />
          💰 Revenue Analysis
        </h2>
        <span className="text-xs text-gray-400">Daily update</span>
      </div>

      <div className="mb-6">
        <p className="text-gray-400 text-sm">Total Revenue (Net)</p>
        <p className="text-3xl sm:text-4xl font-bold text-green-400">
          ${data.total.toLocaleString()}
        </p>
      </div>

      <div className="space-y-3">
        <p className="text-sm text-gray-400">Revenue Sources</p>
        {data.sources.map((source: any) => (
          <div key={source.name} className="flex items-center justify-between">
            <span className="text-sm">{source.name}</span>
            <div className="flex items-center gap-2">
              <span className="text-sm font-mono">
                ${source.amount.toLocaleString()}
              </span>
              <span className="text-xs text-gray-500">
                ({source.percent}%)
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center gap-2 text-sm text-green-400">
        <TrendingUp className="w-4 h-4" />
        <span>+{data.growth}% vs last month</span>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-700 text-xs text-gray-500">
        Data from Supabase • Updated daily
      </div>
    </div>
  );
}
