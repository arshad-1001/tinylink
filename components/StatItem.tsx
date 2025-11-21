export default function StatItem({
    label,
    value,
  }: {
    label: string;
    value: React.ReactNode;
  }) {
    return (
      <div className="p-4 border rounded bg-white shadow-sm">
        <div className="text-xs uppercase text-gray-500 font-medium">
          {label}
        </div>
        <div className="mt-1 text-lg font-semibold break-all">{value}</div>
      </div>
    );
  }  