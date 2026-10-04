import { useQuery } from "@tanstack/react-query"
import { barY, defineChart } from "@tanstack/charts";
import { scaleBand } from "@tanstack/charts/scales/band";
import { scaleLinear } from "@tanstack/charts/scales/linear";
import { tooltip } from "@tanstack/charts/tooltip";
import { Chart } from "@tanstack/charts/react";
import type { LevelsDurations } from "../types/LevelsDuration";

export function LevelDurationChart() {
    const { isPending, error, data } = useQuery<LevelsDurations>({
        queryKey: ['levels-duration'],
        queryFn: async () => {
            const res = await fetch("http://localhost:3000/data-viz/levels-duration")
            return res.json();
        }
    })

    if (isPending) { return <div>Loading ...</div> }

    if (error) { return <div>An error occured ... {error.message}</div> }


    const chart = defineChart({
        marks: [
            barY(data, {
                x: "level",
                y1: "best",
                y2: "worst",
            })
        ],
        scales: {
            x: {
                scale: () => scaleBand<number>().padding(0.2),
                axis: {
                    label: "Level",
                }
            },
            y: {
                scale: scaleLinear,
                nice: true,
                grid: true,
                axis: {
                    label: "Time to complete level"
                }
            }
        },
        tooltip,
    })



    return <div>
        <Chart
            definition={chart}
            height={200}
            ariaLabel="Time to complete each level"
        />
    </div>
}