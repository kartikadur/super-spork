import { useQuery } from "@tanstack/react-query"
import type { LevelsCompleted } from "../types/LevelsCompleted"
import { barY, defineChart } from "@tanstack/charts";
import { scaleBand } from "@tanstack/charts/scales/band";
import { scaleLinear } from "@tanstack/charts/scales/linear";
import { tooltip } from "@tanstack/charts/tooltip";
import { Chart } from "@tanstack/charts/react";

export function LevelsCompletedChart() {
    const { isPending, error, data } = useQuery<LevelsCompleted>({
        queryKey: ['levels-completed'],
        queryFn: async () => {
            const res = await fetch("http://localhost:3000/data-viz/levels-completed")
            return res.json();
        }
    })

    if (isPending) { return <div>Loading ...</div> }

    if (error) { return <div>An error occured ... {error.message}</div> }


    const chart = defineChart({
        marks: [
            barY(data, {
                x: "level",
                y: "users"
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
                    label: "Users"
                }
            }
        },
        tooltip,
    })



    return <div>
        <Chart
            definition={chart}
            height={200}
            ariaLabel="Total count of users completing each level"
        />
    </div>
}