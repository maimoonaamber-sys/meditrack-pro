
"use client";

import { Pie, PieChart, Cell } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";
import { InfoCard } from "./info-card";
import { Target } from "lucide-react";

const chartData = [
  { name: "risk", value: 35, fill: "hsl(var(--primary))" },
  { name: "remaining", value: 65, fill: "hsl(var(--muted))" },
];

export function RiskScore() {
  return (
    <InfoCard
      icon={Target}
      title="Overall Risk Score 🎯"
      description="Based on your profile and inputs"
    >
      <ChartContainer
        config={{}}
        className="mx-auto aspect-square h-[200px]"
      >
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            startAngle={90}
            endAngle={-270}
            cornerRadius={5}
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Pie>
          <foreignObject width="100%" height="100%">
            <div className="flex h-full w-full items-center justify-center text-center">
              <div>
                <p className="text-4xl font-bold font-headline text-primary">
                  {chartData[0].value}%
                </p>
                <p className="text-sm text-muted-foreground">Low Risk</p>
              </div>
            </div>
          </foreignObject>
        </PieChart>
      </ChartContainer>
    </InfoCard>
  );
}
