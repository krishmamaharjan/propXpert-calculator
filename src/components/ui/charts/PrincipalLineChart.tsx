// "use client";

// import React, { useEffect, useRef } from "react";
// import {
//     // Chart,
//     LineController,
//     LineElement,
//     PointElement,
//     LinearScale,
//     CategoryScale,
//     Tooltip,
//     Legend,
//     Filler,
// } from "chart.js";

// import { Chart, registerables } from "chart.js";
// Chart.register(...registerables);

// Chart.register(
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
//     interest: number[];
//     totalPerformance: number[];
// }

// export default function PrincipalLineChart({
//     years,
//     beforeTax,
//     afterTax,
//     interest,
//     totalPerformance,
// }: Props) {
//     const canvasRef = useRef<HTMLCanvasElement | null>(null);

//     useEffect(() => {
//         if (!canvasRef.current) return;

//         const chart = new Chart(canvasRef.current, {
//             type: "line",
//             data: {
//                 labels: years.map((y) => `Year ${y}`),
//                 datasets: [
//                     {
//                         label: "Before Tax Cash Flow",
//                         data: beforeTax,
//                         borderColor: "#F97316",
//                         backgroundColor: "rgba(249, 115, 22, 0.35)",
//                         fill: true,
//                         tension: 0.4,
//                     },
//                     {
//                         label: "After Tax Cash Flow",
//                         data: afterTax,
//                         borderColor: "#10B981",
//                         backgroundColor: "rgba(16, 185, 129, 0.35)",
//                         fill: true,
//                         tension: 0.4,
//                     },
//                     {
//                         label: "Interest Repayment",
//                         data: interest,
//                         borderColor: "#22C55E",
//                         backgroundColor: "rgba(34, 197, 94, 0.35)",
//                         fill: true,
//                         tension: 0.4,
//                     },
//                     {
//                         label: "Total Performance (Growth + Before Tax)",
//                         data: totalPerformance,
//                         borderColor: "#8B5CF6",
//                         backgroundColor: "rgba(139, 92, 246, 0.35)",
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
//                     legend: {
//                         position: "top",
//                         display: false,
//                     },
//                     tooltip: {
//                         backgroundColor: "rgba(0,0,0,0.85)",
//                         padding: 12,
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
//                         title: {
//                             display: true,
//                             text: "Year",
//                         },
//                         grid: {
//                             display: false,
//                         },
//                     },
//                     y: {
//                         title: {
//                             display: true,
//                             text: "Value",
//                         },
//                         ticks: {
//                             callback: (value) => `$${Number(value).toLocaleString()}`,
//                         },
//                     },
//                 },
//             },
//         });

//         return () => chart.destroy();
//     }, [years, beforeTax, afterTax, interest, totalPerformance]);

//     return <canvas ref={canvasRef} />;
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
    interest: number[];
    totalPerformance: number[];
}

export default function PrincipalAreaChart({
    years,
    beforeTax,
    afterTax,
    interest,
    totalPerformance,
}: Props) {
    const data = years.map((year, i) => ({
        year: `Year ${year}`,
        beforeTax: beforeTax?.[i] ?? 0,
        afterTax: afterTax?.[i] ?? 0,
        interest: interest?.[i] ?? 0,
        totalPerformance: totalPerformance?.[i] ?? 0,
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

                    {/* Interest — Muted Blue */}
                    <linearGradient id="interest" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#4FA3D1" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#4FA3D1" stopOpacity={0} />
                    </linearGradient>

                    {/* Total Performance — Strong Primary */}
                    <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#021F45" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="#021F45" stopOpacity={0} />
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

                <Area
                    type="monotone"
                    dataKey="interest"
                    stroke="#4FA3D1"
                    fill="url(#interest)"
                />

                <Area
                    type="monotone"
                    dataKey="totalPerformance"
                    stroke="#021F45"
                    fill="url(#total)"
                />
            </AreaChart>
        </ResponsiveContainer>
    );
}
