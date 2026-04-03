"use client";

import { Progress } from "@/components/ui/progress";
import { SkillResult } from "@/types/common.type";
import { useRouter } from "next/navigation";

export function SkillBreakdown({ topSkills }: { topSkills: SkillResult[] }) {
  const router = useRouter();

  return (
    <div className="bg-white rounded-2xl border border-neutral-40 shadow-xs p-6 flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <h2 className="font-medium text-neutral-100 text-[20px]">
          Skill Breakdown
        </h2>
        <button
          onClick={() => router.push("/dashboard/skills")}
          className="text-sm font-medium text-primary hover:underline cursor-pointer"
        >
          Lihat Semua
        </button>
      </div>

      <div className="flex flex-col gap-4">
        {topSkills?.slice(0, 4).map((skill, i) => (
          <div
            key={skill?.skillId}
            style={{
              opacity: 1 - i * 0.25,
              filter: `blur(${i}px)`,
            }}
            className="flex flex-col gap-1.5"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-neutral-700">
                {skill?.skillName}
              </div>
              <span className="text-sm font-semibold text-neutral-800">
                {skill?.skillScore}%
              </span>
            </div>
            <Progress
              value={skill?.skillScore}
              className="h-2 bg-primary-surface [&>div]:bg-primary"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
