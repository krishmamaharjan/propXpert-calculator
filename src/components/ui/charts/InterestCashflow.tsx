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

// export default function CashflowProjectionChart({
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
    interest?: number[];
    totalPerformance?: number[];
}

export default function CashflowProjectionChart({
    years,
    beforeTax,
    afterTax,
    interest,
    totalPerformance,
}: Props) {
    // Map data into chart-friendly format
    const data = years.map((year, i) => ({
        year: `Year ${year}`,
        beforeTax: beforeTax[i],
        afterTax: afterTax[i],
        interest: interest?.[i],
        totalPerformance: totalPerformance?.[i],
    }));

    return (
        <ResponsiveContainer width="100%" height={350}>
            <AreaChart data={data} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                {/* Gradient fills */}
                <defs>
                    <linearGradient id="beforeTax" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#FB923C" stopOpacity={0.35} />
                        <stop offset="95%" stopColor="#FB923C" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="afterTax" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#FDBA74" stopOpacity={0.35} />
                        <stop offset="95%" stopColor="#FDBA74" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="interest" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#22C55E" stopOpacity={0.35} />
                        <stop offset="95%" stopColor="#22C55E" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.35} />
                        <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
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
                        typeof value === "number" ? [`$${value.toLocaleString()}`, name] : [value, name]
                    }
                />

                {/* Area charts for each dataset */}
                <Area type="monotone" dataKey="beforeTax" stroke="#FB923C" fill="url(#beforeTax)" />
                <Area type="monotone" dataKey="afterTax" stroke="#FDBA74" fill="url(#afterTax)" />

                {interest && (
                    <Area type="monotone" dataKey="interest" stroke="#22C55E" fill="url(#interest)" />
                )}
                {totalPerformance && (
                    <Area type="monotone" dataKey="totalPerformance" stroke="#8B5CF6" fill="url(#total)" />
                )}
            </AreaChart>
        </ResponsiveContainer>
    );
}
