'use client'

import { Progress } from "@/components/ui/progress"
import { BarChart2, FlaskConical, Layers } from "lucide-react"
import { useRouter } from "next/navigation"

const TOP_SKILLS = [
  { name: "JavaScript", icon: <FlaskConical size={16} />, score: 95 },
  { name: "UI/UX Design", icon: <Layers size={16} />, score: 88 },
  { name: "GraphQL", icon: <BarChart2 size={16} />, score: 72 },
]

export function SkillBreakdown() {
  const router = useRouter()

  return (
    <div className="bg-white rounded-2xl border border-neutral-40 shadow-xs p-6 flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-neutral-800 text-base">Skill Breakdown</h2>
        <button onClick={() => router.push("/dashboard/skills")} className="text-sm font-medium text-primary hover:underline cursor-pointer">
          Lihat Semua
        </button>
      </div>
 
      <div className="flex flex-col gap-4">
        {TOP_SKILLS.map((skill) => (
          <div key={skill.name} className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-neutral-700">
                <span className="text-primary">{skill.icon}</span>
                {skill.name}
              </div>
              <span className="text-sm font-semibold text-neutral-800">
                {skill.score}%
              </span>
            </div>
            <Progress
              value={skill.score}
              className="h-2 bg-primary-surface [&>div]:bg-primary"
            />
          </div>
        ))}
      </div>
    </div>
  )
}