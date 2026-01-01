"use client";

import React, { useEffect, useRef } from "react";
import {
    // Chart,
    LineController,
    LineElement,
    PointElement,
    LinearScale,
    CategoryScale,
    Tooltip,
    Legend,
    Filler,
} from "chart.js";

import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

Chart.register(
    LineElement,
    PointElement,
    LinearScale,
    CategoryScale,
    Tooltip,
    Legend,
    Filler
);

interface Props {
    years: number[];
    beforeTax: number[];
    afterTax: number[];
    interest: number[];
    totalPerformance: number[];
}

export default function InterestLineChart({
    years,
    beforeTax,
    afterTax,
    interest,
    totalPerformance,
}: Props) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        if (!canvasRef.current) return;

        const chart = new Chart(canvasRef.current, {
            type: "line",
            data: {
                labels: years.map((y) => `Year ${y}`),
                datasets: [
                    {
                        label: "Before Tax Cash Flow",
                        data: beforeTax,
                        borderColor: "#F97316",
                        backgroundColor: "rgba(249, 115, 22, 0.35)",
                        fill: true,
                        tension: 0.4,
                    },
                    {
                        label: "After Tax Cash Flow",
                        data: afterTax,
                        borderColor: "#10B981",
                        backgroundColor: "rgba(16, 185, 129, 0.35)",
                        fill: true,
                        tension: 0.4,
                    },
                    {
                        label: "Interest Repayment",
                        data: interest,
                        borderColor: "#22C55E",
                        backgroundColor: "rgba(34, 197, 94, 0.35)",
                        fill: true,
                        tension: 0.4,
                    },
                    {
                        label: "Total Performance (Growth + Before Tax)",
                        data: totalPerformance,
                        borderColor: "#8B5CF6",
                        backgroundColor: "rgba(139, 92, 246, 0.35)",
                        fill: true,
                        tension: 0.4,
                    },
                ],
            },
            options: {
                responsive: true,
                interaction: {
                    mode: "index",
                    intersect: false,
                },
                plugins: {
                    legend: {
                        position: "top",
                    },
                    tooltip: {
                        backgroundColor: "rgba(0,0,0,0.85)",
                        padding: 12,
                        callbacks: {
                            label: (ctx) =>
                                `${ctx.dataset.label}: $${Number(
                                    ctx.raw
                                ).toLocaleString()}`,
                        },
                    },
                },
                scales: {
                    x: {
                        title: {
                            display: false,
                            text: "Year",
                        },
                        ticks: {
                            autoSkip: true,
                            maxTicksLimit: 6,
                            maxRotation: 0,
                            minRotation: 0,
                        },
                        grid: {
                            display: false,
                        },
                    },
                    y: {
                        title: {
                            display: false,
                            text: "Value",
                        },
                        // ticks: {
                        //     callback: (value) => `$${Number(value).toLocaleString()}`,
                        // },
                        ticks: {
                            callback: (value) => {
                                const num = Number(value);
                                if (Math.abs(num) >= 1_000_000)
                                    return `$${(num / 1_000_000).toFixed(1)}M`;
                                if (Math.abs(num) >= 1_000)
                                    return `$${(num / 1_000).toFixed(0)}K`;
                                return `$${num}`;
                            },
                        }
                    },
                },
            },
        });

        return () => chart.destroy();
    }, [years, beforeTax, afterTax, interest, totalPerformance]);

    return <canvas ref={canvasRef} />;
}




// "use client"; // if using Next.js 13+ with app directory

// import React, { JSX, useEffect, useRef } from "react";
// import { Chart, registerables, type ChartConfiguration } from "chart.js";

// Chart.register(...registerables);

// // Utility functions for random data (similar to Utils from Chart.js sample)
// const Utils = {
//     CHART_COLORS: {
//         red: "rgb(255, 99, 132)",
//         blue: "rgb(54, 162, 235)",
//         green: "rgb(75, 192, 192)",
//     },
//     numbers: ({ count, min, max }: { count: number; min: number; max: number }): number[] =>
//         Array.from({ length: count }, () =>
//             Math.floor(Math.random() * (max - min + 1)) + min
//         ),
//     months: ({ count }: { count: number }): string[] => {
//         const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
//         return monthNames.slice(0, count);
//     },
// };

// export default function LineChart(): JSX.Element {
//     const chartRef = useRef<HTMLCanvasElement | null>(null);

//     useEffect(() => {
//         const DATA_COUNT = 7;
//         const NUMBER_CFG: { count: number; min: number; max: number } = { count: DATA_COUNT, min: -100, max: 100 };
//         const labels = Utils.months({ count: DATA_COUNT });
//         const data = {
//             labels,
//             datasets: [
//                 {
//                     label: "Unfilled",
//                     fill: false,
//                     backgroundColor: Utils.CHART_COLORS.blue,
//                     borderColor: Utils.CHART_COLORS.blue,
//                     data: Utils.numbers(NUMBER_CFG),
//                 },
//                 {
//                     label: "Dashed",
//                     fill: false,
//                     backgroundColor: Utils.CHART_COLORS.green,
//                     borderColor: Utils.CHART_COLORS.green,
//                     borderDash: [5, 5],
//                     data: Utils.numbers(NUMBER_CFG),
//                 },
//                 {
//                     label: "Filled",
//                     backgroundColor: Utils.CHART_COLORS.red,
//                     borderColor: Utils.CHART_COLORS.red,
//                     data: Utils.numbers(NUMBER_CFG),
//                     fill: true,
//                 },
//             ],
//         };

//         if (!chartRef.current) return;

//         const config = {
//             type: "line",
//             data: data,
//             options: {
//                 responsive: true,
//                 plugins: {
//                     title: {
//                         display: true,
//                         text: "Chart.js Line Chart",
//                     },
//                 },
//                 interaction: {
//                     mode: "index",
//                     intersect: false,
//                 },
//                 scales: {
//                     x: {
//                         display: true,
//                         title: {
//                             display: true,
//                             text: "Month",
//                         },
//                     },
//                     y: {
//                         display: true,
//                         title: {
//                             display: true,
//                             text: "Value",
//                         },
//                     },
//                 },
//             },
//         } as ChartConfiguration;

//         const myChart = new Chart(chartRef.current, config);

//         return () => {
//             myChart.destroy();
//         };
//     }, []);

//     return <canvas ref={chartRef} />;
// }
