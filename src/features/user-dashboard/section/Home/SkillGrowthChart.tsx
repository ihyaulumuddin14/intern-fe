'use client'

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"

const SKILL_GROWTH_DATA = [
  { skill: "SQL",        currentLevel: 3, targetLevel: 3 },
  { skill: "Python",     currentLevel: 2, targetLevel: 3 },
  { skill: "Stats",      currentLevel: 2, targetLevel: 3 },
  { skill: "Tableau",    currentLevel: 1, targetLevel: 2 },
  { skill: "ML",         currentLevel: 1, targetLevel: 3 },
  { skill: "Excel",      currentLevel: 3, targetLevel: 3 },
  { skill: "GraphQL",    currentLevel: 2, targetLevel: 2 },
]

const chartConfig: ChartConfig = {
  currentLevel: {
    label: "Level Saat Ini",
    color: "hsl(var(--primary))",
  },
  targetLevel: {
    label: "Target Level",
    color: "hsl(var(--primary) / 0.25)",
  },
}

const Y_TICKS = [0, 1, 2, 3]
const Y_LABELS: Record<number, string> = {
  0: "No Exp",
  1: "Beginner",
  2: "Intermediate",
  3: "Expert",
}

export function SkillGrowthChart() {
  return (
    <div className="bg-white rounded-2xl border border-neutral-40 shadow-xs p-6 flex flex-col gap-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="font-semibold text-neutral-100 text-[20px]">Skill Growth</h2>
          <p className="text-base text-neutral-70 mt-0.5">Perbandingan level saat ini vs target</p>
        </div>
      </div>
 
      <ChartContainer config={chartConfig} className="h-52 w-full">
        <AreaChart
          data={SKILL_GROWTH_DATA}
          margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="gradCurrent" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.35} />
              <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.02} />
            </linearGradient>
            <linearGradient id="gradTarget" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.15} />
              <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.01} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
          <XAxis
            dataKey="skill"
            tick={{ fontSize: 11, fill: "#9ca3af" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            ticks={Y_TICKS}
            tickFormatter={(v) => Y_LABELS[v] ?? ""}
            tick={{ fontSize: 10, fill: "#9ca3af" }}
            axisLine={false}
            tickLine={false}
            width={72}
          />
          <ChartTooltip
            content={
              <ChartTooltipContent
                formatter={(value, name) => [
                  Y_LABELS[value as number] ?? value,
                  name === "currentLevel" ? "Level Saat Ini" : "Target Level",
                ]}
              />
            }
          />
          {/* Target area — rendered first so it sits behind */}
          <Area
            type="monotone"
            dataKey="targetLevel"
            stroke="hsl(var(--primary) / 0.4)"
            strokeWidth={1.5}
            strokeDasharray="4 3"
            fill="url(#gradTarget)"
            dot={false}
          />
          {/* Current level area */}
          <Area
            type="monotone"
            dataKey="currentLevel"
            stroke="hsl(var(--primary))"
            strokeWidth={2}
            fill="url(#gradCurrent)"
            dot={{ r: 3, fill: "hsl(var(--primary))", strokeWidth: 0 }}
            activeDot={{ r: 5 }}
          />
        </AreaChart>
      </ChartContainer>
 
      {/* Legend */}
      <div className="flex items-center gap-5 text-xs text-neutral-500">
        <span className="flex items-center gap-1.5">
          <span className="inline-block w-5 h-0.5 rounded bg-primary" />
          Level Saat Ini
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block w-5 h-px rounded border-t-2 border-dashed border-primary/50" />
          Target Level
        </span>
      </div>
    </div>
  )
}