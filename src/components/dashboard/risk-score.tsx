
"use client";

import { Pie, PieChart, Cell } from "recharts";
import { ChartContainer } from "@/components/ui/chart";
import { InfoCard } from "./info-card";
import { Target } from "lucide-react";
import { useMemo } from "react";

const chartData = [{ name: "risk", value: 35 }];

export function RiskScore() {
  const riskValue = chartData[0].value;

  const { riskColor, riskLabel, cardBgClass, textClass, iconBgClass } = useMemo(() => {
    if (riskValue < 50) {
      return {
        riskColor: "hsl(var(--chart-emerald))",
        riskLabel: "Low Risk",
        cardBgClass: "bg-[hsl(var(--chart-emerald)/0.1)]",
        textClass: "text-[hsl(var(--chart-emerald))]",
        iconBgClass: "bg-[hsl(var(--chart-emerald)/0.2)] text-[hsl(var(--chart-emerald))]",
      };
    } else if (riskValue >= 50 && riskValue <= 80) {
      return {
        riskColor: "hsl(var(--chart-orange))",
        riskLabel: "Moderate Risk",
        cardBgClass: "bg-[hsl(var(--chart-orange)/0.1)]",
        textClass: "text-[hsl(var(--chart-orange))]",
        iconBgClass: "bg-[hsl(var(--chart-orange)/0.2)] text-[hsl(var(--chart-orange))]",
      };
    } else {
      // risk > 80
      return {
        riskColor: "hsl(var(--chart-red))",
        riskLabel: "High Risk",
        cardBgClass: "bg-[hsl(var(--chart-red)/0.1)]",
        textClass: "text-[hsl(var(--chart-red))]",
        iconBgClass: "bg-[hsl(var(--chart-red)/0.2)] text-[hsl(var(--chart-red))]",
      };
    }
  }, [riskValue]);

  const pieData = [
    { name: 'risk', value: riskValue },
    { name: 'remaining', value: 100 - riskValue },
  ];

  return (
    <InfoCard
      icon={Target}
      title="Overall Risk Score 🎯"
      description="Based on your profile and inputs"
      cardClassName={cardBgClass}
      titleClassName={textClass}
      iconClassName={iconBgClass}
    >
      <ChartContainer
        config={{}}
        className="mx-auto aspect-square h-[200px]"
      >
        <PieChart>
          <Pie
            data={pieData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            startAngle={90}
            endAngle={450}
            strokeWidth={0}
          >
            <Cell
              key="risk"
              fill={riskColor}
            />
            <Cell
              key="remaining"
              fill="hsl(var(--muted))"
            />
          </Pie>
          <foreignObject width="100%" height="100%">
            <div className="flex h-full w-full items-center justify-center text-center">
              <div>
                <p className={`text-4xl font-bold font-headline ${textClass}`}>
                  {riskValue}%
                </p>
                <p className="text-sm text-muted-foreground">{riskLabel}</p>
              </div>
            </div>
          </foreignObject>
        </PieChart>
      </ChartContainer>
    </InfoCard>
  );
}
