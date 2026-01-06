// "use client";

// import React, { useEffect, useRef } from "react";
// import {
//     Chart,
//     LineController,
//     LineElement,
//     PointElement,
//     LinearScale,
//     CategoryScale,
//     Tooltip,
//     Filler,
// } from "chart.js";

// Chart.register(
//     LineController,
//     LineElement,
//     PointElement,
//     LinearScale,
//     CategoryScale,
//     Tooltip,
//     Filler
// );

// interface Props {
//     years: number[];
//     propertyValues: number[];
// }

// export default function PGrowthProjectionChart({
//     years,
//     propertyValues,
// }: Props) {
//     const ref = useRef<HTMLCanvasElement | null>(null);

//     useEffect(() => {
//         if (!ref.current) return;

//         const chart = new Chart(ref.current, {
//             type: "line",
//             data: {
//                 labels: years,
//                 datasets: [
//                     {
//                         label: "Property Value",
//                         data: propertyValues,
//                         borderColor: "#FDBA74",
//                         backgroundColor: "rgba(253,186,116,0.45)",
//                         fill: true,
//                         tension: 0.4,
//                     },
//                 ],
//             },
//             options: {
//                 responsive: true,
//                 interaction: {
//                     mode: "index",
//                     intersect: false,
//                 },
//                 plugins: {
//                     legend: { display: false },
//                     tooltip: {
//                         backgroundColor: "#111",
//                         callbacks: {
//                             label: (ctx) =>
//                                 `$${Number(ctx.raw).toLocaleString()}`,
//                         },
//                     },
//                 },
//                 scales: {
//                     x: {
//                         title: { display: true, text: "Year" },
//                     },
//                     y: {
//                         title: { display: true, text: "Value" },
//                         ticks: {
//                             callback: (v) => `$${Number(v).toLocaleString()}`,
//                         },
//                     },
//                 },
//             },
//         });

//         return () => chart.destroy();
//     }, [years, propertyValues]);

//     return <canvas ref={ref} />;
// }

"use client";

import {
    Area,
    AreaChart,
    CartesianGrid,
    Tooltip,
    XAxis,
    YAxis,
    ResponsiveContainer,
} from "recharts";

interface Props {
    years: number[];
    propertyValues: number[];
}

export default function PGrowthProjectionChart({
    years,
    propertyValues,
}: Props) {
    // Prepare data safely
    const data = years.map((year, i) => ({
        year: `Year ${year}`,
        propertyValue: propertyValues?.[i] ?? 0,
    }));

    return (
        <ResponsiveContainer width="100%" height={350}>
            <AreaChart data={data} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                {/* Theme-based gradient (NO red / green) */}
                <defs>
                    {/* Property Value — Primary */}
                    <linearGradient id="propertyValue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#032D5F" stopOpacity={0.35} />
                        <stop offset="95%" stopColor="#032D5F" stopOpacity={0} />
                    </linearGradient>
                </defs>

                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="year" tick={{ fontSize: 12 }} />
                <YAxis
                    tickFormatter={(v) =>
                        Math.abs(v) >= 1_000_000
                            ? `$${(v / 1_000_000).toFixed(1)}M`
                            : Math.abs(v) >= 1_000
                            ? `$${(v / 1_000).toFixed(0)}K`
                            : `$${v}`
                    }
                />

                <Tooltip
                    formatter={(value) =>
                        typeof value === "number"
                            ? `$${value.toLocaleString()}`
                            : value
                    }
                />

                {/* Area */}
                <Area
                    type="monotone"
                    dataKey="propertyValue"
                    stroke="#032D5F"
                    fill="url(#propertyValue)"
                />
            </AreaChart>
        </ResponsiveContainer>
    );
}
