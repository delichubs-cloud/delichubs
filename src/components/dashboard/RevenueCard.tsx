import { DollarSign, TrendingUp } from "lucide-react";
import type { RevenueData } from "@/types";

interface RevenueCardProps {
  data: RevenueData;
}

export default function RevenueCard({ data }: RevenueCardProps) {
  return (
    <div className="bg-gray-900 rounded-lg p-5 sm:p-6 border border-gray-800">
      <div className="flex items-center justify-between gap-3 mb-4">
        <h2 className="text-lg sm:text-xl font-bold flex items-center gap-2">
          <DollarSign className="w-5 h-5 text-green-400" />
          💰 Revenue Analysis
        </h2>
        <span className="text-xs text-gray-400">Real-time</span>
      </div>

      <div className="mb-6">
        <p className="text-gray-400 text-sm">Total Revenue (Net)</p>
        <p className="text-3xl sm:text-4xl font-bold text-green-400">
          ${data.total.toLocaleString()}
        </p>
      </div>

      <div className="space-y-3">
        <p className="text-sm text-gray-400">Revenue Sources</p>
        {data.sources.map((source) => (
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
    </div>
  );
}
