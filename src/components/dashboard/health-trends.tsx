"use client"

import { Line, LineChart, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"
import type { ChartConfig } from "@/components/ui/chart"

const chartData = [
  { month: "January", systolic: 120, diastolic: 80 },
  { month: "February", systolic: 122, diastolic: 81 },
  { month: "March", systolic: 118, diastolic: 79 },
  { month: "April", systolic: 125, diastolic: 82 },
  { month: "May", systolic: 123, diastolic: 80 },
  { month: "June", systolic: 120, diastolic: 78 },
]

const chartConfig = {
  systolic: {
    label: "Systolic",
    color: "hsl(var(--primary))",
  },
  diastolic: {
    label: "Diastolic",
    color: "hsl(var(--accent))",
  },
} satisfies ChartConfig

export function HealthTrends() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Health Trends</CardTitle>
        <CardDescription>Monthly Blood Pressure Reading</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[250px] w-full">
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              domain={['dataMin - 10', 'dataMax + 10']}
            />
            <Tooltip cursor={false} content={<ChartTooltipContent />} />
            <Line
              dataKey="systolic"
              type="monotone"
              stroke="var(--color-systolic)"
              strokeWidth={2}
              dot={true}
            />
            <Line
              dataKey="diastolic"
              type="monotone"
              stroke="var(--color-diastolic)"
              strokeWidth={2}
              dot={true}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
