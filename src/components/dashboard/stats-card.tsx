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
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <h3 className="text-sm text-slate-500">
        {title}
      </h3>

      <h2 className="mt-2 text-3xl font-bold">
        {value}
      </h2>

      <p className="mt-2 text-sm text-green-600">
        {change}
      </p>
    </div>
  );
}