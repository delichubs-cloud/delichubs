import { Activity } from "lucide-react";
import type { TokenData } from "@/types";

interface TokenUsageCardProps {
  data: TokenData;
}

export default function TokenUsageCard({ data }: TokenUsageCardProps) {
  return (
    <div className="bg-gray-900 rounded-lg p-5 sm:p-6 border border-gray-800">
      <div className="flex items-center justify-between gap-3 mb-4">
        <h2 className="text-lg sm:text-xl font-bold flex items-center gap-2">
          <Activity className="w-5 h-5 text-blue-400" />
          🎯 Token Usage
        </h2>
        <div className="flex items-center gap-1 shrink-0">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-xs text-gray-400">Live</span>
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
        {data.models.map((model) => (
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
    </div>
  );
}
