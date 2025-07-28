"use client"

import { CartesianGrid, LabelList, Line, LineChart, XAxis, YAxis } from "recharts"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "A line chart with a label"

// const chartData = [
//   { days: "Sat", mobile: 0 },
//   { days: "Sun", mobile: 20 },
//   { days: "Mon", mobile: 10 },
//   { days: "Tue", mobile: 15 },
//   { days: "Wed", mobile: 5 },
//   { days: "Thu", mobile: 10 },
//   { days: "Fri", mobile: 18 },
// ]



const margin = {
    top: 20,
    left: 12,
    right: 12,
  }


  export type TypeChartData = {
    x: {
      label:string,
      data: string[]
    },
    y: {
      label:string,
      data: number[]
    },
  }
export function ChartLineLabel({chartData}:{chartData:TypeChartData}) {
  const xDataKey = chartData.x.label
  const yDataKey = chartData.y.label
  const formattedData = chartData.x.data.map((x,index) => {
    return {
      [xDataKey] : x, [yDataKey] : chartData.y.data[index]
    }
  })
  
  const chartConfig = {
    x: {
      label: "test",
      color: "var(--chart-2)",
    },
  } satisfies ChartConfig

  return (
      <ChartContainer config={chartConfig} className="h-[200px] aspect-auto">
          <LineChart
            accessibilityLayer
            data={formattedData}
            margin={margin}
          >
             <defs>
             <linearGradient
              id="valueBasedGradient"
              x1="0"
              y1="1"
              x2="0"
              y2="0"
            >
                <stop offset="0%" stopColor="var(--color-app-purple-300)" stopOpacity={1} />
                <stop offset="100%" stopColor="var(--color-primary)" stopOpacity={1} />
            </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey={xDataKey}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis
  domain={['dataMin', 'dataMax']} // gives breathing room above the top value
  tickCount={20} // optional: number of Y-axis steps
  tickLine={false}
  axisLine={false}
  hide
/>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Line
              dataKey={yDataKey}
              type="natural"
              stroke="url(#valueBasedGradient)"
              strokeWidth={5}
              dot={{
                r: 8,
                strokeWidth: 2,
                stroke: "white",
                fill: "var(--color-primary)",
              }}
              activeDot={{
                r: 10,
                stroke: "white",
                fill: "var(--color-primary)",
              }}
            >
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Line>
          </LineChart>
        </ChartContainer>

  )
}
