'use client'

import { useAnalytics } from "@/hooks/career-sessions.hooks";
import { useEffect, useMemo, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { UserLevel } from "@/schemas/career-sessions.schema";
import { SkillResult } from "@/types/common.type";
import { useCareerSessionStore } from "@/stores/useCareerSessionStore";
import { SkeletonRow } from "./SkeletonRow";
import { useUser } from "@/hooks/users.hooks";

interface MergedSkill extends SkillResult {
  priority: number;
  targetLevel?: UserLevel;
}

const getStatus = (gap: number) => {
  if (gap === 0) return { label: "Match", variant: "default" as const };
  if (gap === 1)
    return { label: "Needs Improvement", variant: "secondary" as const };
  return { label: "Critical", variant: "destructive" as const };
};

const DashboardSkillsPage = () => {
  const { careerSessionStatus, setCareerSessionStatus } = useCareerSessionStore()
  const [careerSessionId, setCareerSessionId] = useState<string>("");
  const { analytics, isPending } = useAnalytics(careerSessionId);

  const mergedData = useMemo<MergedSkill[]>(() => {
    if (!analytics) return [];

    return analytics.skillsResult
      .map((skill) => {
        const rec = analytics.recommendations.find(
          (r) => r.skillId === skill.skillId
        );

        return {
          ...skill,
          priority: rec?.priority ?? 999,
          targetLevel: rec?.targetLevel,
        };
      })
      .sort((a, b) => {
        if (a.priority !== b.priority) return a.priority - b.priority;
        return b.gapLevel - a.gapLevel;
      });
  }, [analytics, careerSessionId, careerSessionStatus]);

  useEffect(() => {
    const storedId = localStorage.getItem("selected-career-session-id");
    if (storedId) {
      setCareerSessionId(storedId);
    }
  }, []);

  const isNotLearning = careerSessionStatus !== "on_learning" && !careerSessionId;

  return (
    <div className="w-full">
      <header className="flex flex-col gap-2 my-5">
        <h2 className="font-semibold text-3xl md:text-4xl">Daftar Skill</h2>
        <p>Skillgap analysis membantu kamu mengetahui apa saja skill yang kurang</p>
      </header>

      <div className="lg:w-full w-screen overflow-x-auto mr-8">
        <div className="w-full border rounded-xl p-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Skill</TableHead>
                <TableHead>Current</TableHead>
                <TableHead>Required</TableHead>
                <TableHead>Gap</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Suggestion</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {isNotLearning && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-neutral-500">
                    Belum ada data skill. Mulai atau lanjutkan sesi karir terlebih dahulu
                  </TableCell>
                </TableRow>
              )}

              {!isNotLearning && isPending &&
                Array.from({ length: 5 }).map((_, i) => (
                  <SkeletonRow key={i} />
                ))}

              {!isNotLearning && !isPending && mergedData.length > 0 &&
                mergedData.map((skill: MergedSkill) => {
                  const status = getStatus(skill.gapLevel);

                  return (
                    <TableRow key={skill.skillId}>
                      <TableCell className="font-medium">
                        {skill.skillName}
                      </TableCell>

                      <TableCell>
                        <Badge>{skill.finalUserLevel}</Badge>
                      </TableCell>

                      <TableCell>
                        <Badge variant="outline">{skill.requiredLevel}</Badge>
                      </TableCell>

                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span>{skill.gapLevel}</span>
                          <Progress value={Math.min(skill.gapLevel * 25, 100)} />
                        </div>
                      </TableCell>

                      <TableCell>
                        <Badge variant={status.variant as any}>
                          {status.label}
                        </Badge>
                      </TableCell>

                      <TableCell>
                        <Badge variant="secondary">{skill.priority}</Badge>
                      </TableCell>

                      <TableCell>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger className="underline cursor-pointer">
                              View
                            </TooltipTrigger>
                            <TooltipContent>
                              <div className="flex flex-col gap-1">
                                {skill.suggestionLevel?.map(
                                  (lvl: string, i: number) => (
                                    <span key={i}>→ {lvl}</span>
                                  )
                                )}
                              </div>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </TableCell>
                    </TableRow>
                  );
                })}

              {!isNotLearning && !isPending && mergedData.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-neutral-500">
                    Tidak ada skill yang tersedia
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <footer className="mt-4 text-sm text-muted-foreground">
        {mergedData.length} skills analyzed
      </footer>
    </div>
  )
}

export default DashboardSkillsPage