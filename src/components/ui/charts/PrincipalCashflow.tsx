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
//     Legend,
//     Filler,
// } from "chart.js";

// Chart.register(
//     LineController,
//     LineElement,
//     PointElement,
//     LinearScale,
//     CategoryScale,
//     Tooltip,
//     Legend,
//     Filler
// );

// interface Props {
//     years: number[];
//     beforeTax: number[];
//     afterTax: number[];
// }

// export default function PCashflowProjectionChart({
//     years,
//     beforeTax,
//     afterTax,
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
//                         label: "Before Tax Cash Flow",
//                         data: beforeTax,
//                         borderColor: "#FB923C",
//                         backgroundColor: "rgba(251,146,60,0.45)",
//                         fill: true,
//                         tension: 0.4,
//                     },
//                     {
//                         label: "After Tax Cash Flow",
//                         data: afterTax,
//                         borderColor: "#FDBA74",
//                         backgroundColor: "rgba(253,186,116,0.35)",
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
//                                 `${ctx.dataset.label}: $${Number(
//                                     ctx.raw
//                                 ).toLocaleString()}`,
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
//     }, [years, beforeTax, afterTax]);

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
    beforeTax: number[];
    afterTax: number[];
}

export default function PCashflowProjectionChart({
    years,
    beforeTax,
    afterTax,
}: Props) {
    // Prepare data safely
    const data = years.map((year, i) => ({
        year: `Year ${year}`,
        beforeTax: beforeTax?.[i] ?? 0,
        afterTax: afterTax?.[i] ?? 0,
    }));

    return (
        <ResponsiveContainer width="100%" height={350}>
            <AreaChart data={data} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                {/* Theme-based gradients (NO red / green) */}
                <defs>
                    {/* Before Tax — Primary */}
                    <linearGradient id="beforeTax" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#032D5F" stopOpacity={0.35} />
                        <stop offset="95%" stopColor="#032D5F" stopOpacity={0} />
                    </linearGradient>

                    {/* After Tax — Secondary */}
                    <linearGradient id="afterTax" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#0775B8" stopOpacity={0.35} />
                        <stop offset="95%" stopColor="#0775B8" stopOpacity={0} />
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
                    formatter={(value, name) =>
                        typeof value === "number"
                            ? [`$${value.toLocaleString()}`, name]
                            : [value, name]
                    }
                />

                {/* Areas */}
                <Area
                    type="monotone"
                    dataKey="beforeTax"
                    stroke="#032D5F"
                    fill="url(#beforeTax)"
                />

                <Area
                    type="monotone"
                    dataKey="afterTax"
                    stroke="#0775B8"
                    fill="url(#afterTax)"
                />
            </AreaChart>
        </ResponsiveContainer>
    );
}
