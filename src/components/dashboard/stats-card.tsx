interface StatsCardProps {
  title: string;
  value: string;
  change: string;
}

export default function StatsCard({
  title,
  value,
  change,
}: StatsCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border p-6">
      <h3 className="text-sm text-slate-500">{title}</h3>

      <h2 className="text-3xl font-bold mt-2">{value}</h2>

      <p className="text-green-600 text-sm mt-2">{change}</p>
    </div>
  );
}