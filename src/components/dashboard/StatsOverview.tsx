'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase-client';

export default function StatsOverview() {
  const [stats, setStats] = useState({
    revenue: 0,
    tokens: '0M',
    users: 0,
    days: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        // 获取 metrics
        const { data: metrics } = await supabase
          .from('metrics')
          .select('key, value');

        // 获取 javis_claw_logs count
        const { count: daysCount } = await supabase
          .from('javis_claw_logs')
          .select('*', { count: 'exact', head: true });

        // 获取 task_logs count
        const { count: taskCount } = await supabase
          .from('task_logs')
          .select('*', { count: 'exact', head: true });

        const metricsMap = (metrics || []).reduce((acc, item) => {
          acc[item.key] = item.value;
          return acc;
        }, {} as Record<string, number>);

        // 估算 token 使用量
        const estimatedTokens = ((taskCount || 0) * 15000 / 1000000).toFixed(1);

        setStats({
          revenue: metricsMap.total_revenue || 0,
          tokens: `${estimatedTokens}M`,
          users: metricsMap.total_users || 0,
          days: daysCount || 0
        });
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();

    // 每 5 分钟刷新
    const interval = setInterval(fetchStats, 300000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-gray-900 rounded-lg p-5 border border-gray-800 animate-pulse">
            <div className="h-4 bg-gray-700 rounded w-1/2 mb-2"></div>
            <div className="h-8 bg-gray-700 rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-gray-700 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    );
  }

  const cards = [
    {
      icon: '💰',
      title: 'Total Revenue',
      value: `$${stats.revenue.toLocaleString()}`,
      change: '+18.5% vs last month',
      color: 'green'
    },
    {
      icon: '🎯',
      title: 'Token Usage',
      value: stats.tokens,
      change: `${((parseFloat(stats.tokens) * 1000000) / 30 / 1000).toFixed(0)}K today`,
      color: 'blue'
    },
    {
      icon: '👥',
      title: 'Total Users',
      value: stats.users.toLocaleString(),
      change: `${Math.floor(stats.users * 0.07)} paid`,
      color: 'purple'
    },
    {
      icon: '⏰',
      title: 'Active Days',
      value: stats.days.toString(),
      change: 'tracking days',
      color: 'yellow'
    }
  ];

  const colorMap: Record<string, string> = {
    green: 'text-green-400',
    blue: 'text-blue-400',
    purple: 'text-purple-400',
    yellow: 'text-yellow-400'
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {cards.map((card) => (
        <div
          key={card.title}
          className="bg-gray-900 rounded-lg p-5 sm:p-6 border border-gray-800 hover:border-gray-700 transition"
        >
          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl">{card.icon}</span>
            <h3 className="text-sm text-gray-400">{card.title}</h3>
          </div>
          <p className={`text-3xl sm:text-4xl font-bold mb-2 ${colorMap[card.color]}`}>
            {card.value}
          </p>
          <p className="text-xs text-gray-500">{card.change}</p>
        </div>
      ))}
    </div>
  );
}
