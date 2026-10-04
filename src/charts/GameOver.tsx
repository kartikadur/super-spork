import { useQuery } from "@tanstack/react-query";
import type { GameOver } from "../types/GameOver";
import { defineChart } from "@tanstack/charts";
import { pie, polar, radialArc, radialText } from "@tanstack/charts/polar";
import { Chart } from "@tanstack/charts/react";
import { scaleLinear } from "@tanstack/charts/scales/linear";

export function GameOverChart() {
    const { isPending, error, data } = useQuery<GameOver[]>({
        queryKey: ['game-ended'],
        queryFn: async () => {
            const res = await fetch("http://localhost:3000/data-viz/game-ended")
            return res.json();
        }
    })

    if (isPending) { return <div>Loading ...</div> }

    if (error) { return <div>An error occured ... {error.message}</div> }

    const slices = pie(data, { value: 'share' })
    const reasons = data.map(row => row.category);
    const labels = slices.map(slice => {
        const angle = (slice.startAngle + slice.endAngle) / 2;

        return {
            ...slice,
            angle,
            radius: 125,
            label: slice.category
        }
    })
    const chart = defineChart({
        marks: [
            polar({
                inset: 8,
                radiusRatio: 0.82,
                marks: [
                    radialArc(slices, {
                        innerRadius: ({ radius }) => radius * 0.58,
                        cornerRadius: 4,
                        color: 'category',
                        key: 'category'
                    }),
                    radialText(labels, {
                        angle: 'angle',
                        radius: 'radius',
                        text: 'label',
                        anchor: 'middle',
                        baseline: 'middle',
                        fill: 'currentColor',
                        fontSize: 12,
                        key: 'label',
                    })
                ],
                scales: {
                    angle: {
                        scale: scaleLinear().domain([0, 2 * Math.PI]),
                    },
                    radius: {
                        scale: scaleLinear().domain([0, 100]),
                    },
                }
            }
            )
        ],
        scales: {
            x: null,
            y: null,
        },
        color: {
            domain: reasons,
            range: ['#0ea5e9', '#6366f1', '#a855f7', '#ec4899', '#f97316', '#94a3b8'],
        }
    })

    return <div>
        <Chart
            definition={chart}
            height={200}
            ariaLabel="Reasons why users have stopped playing"
        />
    </div>

}