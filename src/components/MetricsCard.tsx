import { useEffect, useState } from "react";

type MetricsCardProps = {
  title: string;
  value: number;
  trend: string;
  trendDirection: "up" | "down" | "neutral";
};

export default function MetricsCard({
  title,
  value,
  trend,
  trendDirection,
}: MetricsCardProps) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    const duration = 1000;
    const increment = end / (duration / 50);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        clearInterval(timer);
        setDisplayValue(end);
      } else {
        setDisplayValue(Math.floor(start));
      }
    }, 50);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <div className="rounded-lg bg-white p-4 shadow transition-shadow hover:shadow-md">
      <h3 className="text-sm font-medium text-gray-500">{title}</h3>
      <div className="mt-2 flex items-baseline">
        <p className="text-2xl font-semibold">{displayValue}</p>
        <span
          className={`ml-2 text-xs font-medium ${
            trendDirection === "up"
              ? "text-green-600"
              : trendDirection === "down"
                ? "text-red-600"
                : "text-gray-500"
          }`}
        >
          {trend}
        </span>
      </div>
    </div>
  );
}
