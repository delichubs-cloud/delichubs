interface StatCardProps {
  icon: string;
  title: string;
  value: string | number;
  change: string;
  color: "green" | "blue" | "purple" | "yellow";
}

const colorMap = {
  green: "text-green-400",
  blue: "text-blue-400",
  purple: "text-purple-400",
  yellow: "text-yellow-400",
} satisfies Record<StatCardProps["color"], string>;

export default function StatCard({
  icon,
  title,
  value,
  change,
  color,
}: StatCardProps) {
  return (
    <div className="bg-gray-900 rounded-lg p-5 sm:p-6 border border-gray-800 hover:border-gray-700 transition-colors duration-200">
      <div className="flex items-center justify-between mb-4">
        <span className="text-2xl">{icon}</span>
        <span className="text-xs text-gray-500">Live</span>
      </div>
      <p className="text-sm text-gray-400 mb-1">{title}</p>
      <p className={`text-2xl sm:text-3xl font-bold ${colorMap[color]}`}>{value}</p>
      <p className="text-xs text-gray-500 mt-2">{change}</p>
    </div>
  );
}
