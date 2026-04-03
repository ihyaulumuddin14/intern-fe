'use client'

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig
} from "@/components/ui/chart"
import { SkillResult } from "@/types/common.type"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"

const chartConfig: ChartConfig = {
  currentLevel: {
    label: "Level Saat Ini",
    color: "hsl(var(--primary))",
  },
  targetLevel: {
    label: "Target Level",
    color: "hsl(var(--primary) / 0.3)",
  },
}

const Y_TICKS = [0, 1, 2, 3]
const Y_LABELS: Record<number, string> = {
  0: "No Exp",
  1: "Beginner",
  2: "Intermediate",
  3: "Expert",
}

const LEVEL_TO_NUMBER: Record<string, number> = {
  no_experience: 0,
  beginner: 1,
  intermediate: 2,
  expert: 3,
}

export function SkillGrowthChart({
  skillsResult
}: {
  skillsResult: SkillResult[]
}) {
  const data = skillsResult?.map((s) => ({
    skill: s.skillName,
    currentLevel: LEVEL_TO_NUMBER[s.finalUserLevel] ?? 0,
    targetLevel: LEVEL_TO_NUMBER[s.requiredLevel] ?? 0,
  })) ?? []

  return (
    <div className="bg-white rounded-2xl border border-neutral-40 shadow-xs p-6 flex flex-col gap-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="font-medium text-neutral-100 text-[20px]">Skill Growth</h2>
          <p className="text-base text-neutral-70 mt-0.5">Perbandingan level saat ini vs target</p>
        </div>
      </div>

      <ChartContainer config={chartConfig} className="h-52 w-full">
        <AreaChart
          data={data}
          margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="gradCurrent" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.35} />
              <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.02} />
            </linearGradient>
            <linearGradient id="gradTarget" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#9ca3af" stopOpacity={0.15} />
              <stop offset="95%" stopColor="#9ca3af" stopOpacity={0.01} />
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
                  <span key={name} className="ml-2">
                    {Y_LABELS[value as number] ?? value}
                  </span>,
                  name === "currentLevel" ? "Level Saat Ini" : "Target Level",
                ]}
              />
            }
          />
          <Area
            type="monotone"
            dataKey="targetLevel"
            stroke="#9ca3af"
            strokeWidth={1.5}
            strokeDasharray="4 3"
            fill="url(#gradTarget)"
            dot={false}
          />
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

      <div className="flex items-center gap-6 text-xs text-neutral-500 mt-1">
        <span className="flex items-center gap-2">
          <span className="inline-block w-5 h-0.5 rounded bg-primary" />
          Level Saat Ini
        </span>
        <span className="flex items-center gap-2">
          <span className="inline-block w-5 h-px rounded border-t-2 border-dashed border-neutral-400" />
          Target Level
        </span>
      </div>
    </div>
  )
}