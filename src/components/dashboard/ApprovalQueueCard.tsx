'use client';

import { useEffect, useState } from 'react';
import { getApprovalData } from '@/lib/dashboard-data';

export default function ApprovalQueueCard() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const approvalData = await getApprovalData();
        setData(approvalData);
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

  const iconMap: Record<string, string> = {
    email: '📧',
    social: '📱',
    payment: '💰'
  };

  return (
    <div className="bg-gray-900 rounded-lg p-5 sm:p-6 border border-gray-800">
      <div className="flex items-center justify-between gap-3 mb-4">
        <h2 className="text-lg sm:text-xl font-bold">✅ Approval Queue</h2>
        <span className="bg-yellow-900 text-yellow-400 text-xs px-2 py-1 rounded shrink-0">
          {data.pending} pending
        </span>
      </div>

      <div className="space-y-3">
        {data.items.map((item: any) => (
          <div
            key={item.id}
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-3 bg-gray-800 rounded hover:bg-gray-700 transition"
          >
            <div className="flex items-start gap-3 min-w-0">
              <span className="text-xl shrink-0">{iconMap[item.type]}</span>
              <div className="min-w-0">
                <p className="font-medium">{item.title}</p>
                {item.description ? (
                  <p className="text-xs text-gray-400 mt-1">{item.description}</p>
                ) : null}
                <p className="text-xs text-gray-500 mt-1">{item.time}</p>
              </div>
            </div>
            <div className="flex gap-2 shrink-0">
              <button className="text-xs px-3 py-1 bg-green-600 hover:bg-green-500 rounded">
                Approve
              </button>
              <button className="text-xs px-3 py-1 bg-gray-600 hover:bg-gray-500 rounded">
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>

      {data.items.length === 0 ? (
        <p className="text-center text-gray-500 py-8">All tasks cleared.</p>
      ) : null}

      <div className="mt-4 pt-4 border-t border-gray-700 text-xs text-gray-500">
        Data from activity_logs • Updated daily
      </div>
    </div>
  );
}
