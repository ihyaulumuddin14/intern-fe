"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { useAnalytics } from "@/hooks/career-sessions.hooks";
import { SkillResult } from "@/types/common.type";
import { ArrowRight } from "iconsax-reactjs";
import { useEffect, useState } from "react";

export function RecommendedationSection() {
  const [careerSessionId, setCareerSessionId] = useState<string>("");
  const { analytics, isPending } = useAnalytics(careerSessionId);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [skill, setSkill] = useState<SkillResult | null>(null);

  useEffect(() => {
    const storedId = localStorage.getItem("selected-career-session-id");
    if (storedId) {
      setCareerSessionId(storedId);
    }
  }, []);

  const recommendations =
    analytics?.recommendations
      ?.sort((a, b) => (b.priority ?? 0) - (a.priority ?? 0))
      ?.slice(0, 3)
      ?.map((rec) => ({
        title: rec.skillName,
        desc: `Target level: ${rec.targetLevel}, Current level: ${rec.currentLevel}`,
        skillId: rec.skillId,
      })) ?? [];

  return (
    <div className="flex flex-col gap-4">
      <h2 className="font-medium text-xl text-neutral-800">
        Direkomendasikan Untukmu
      </h2>
      {isPending ? (
        <div className="flex items-center justify-center py-8 text-neutral-70">
          Memuat rekomendasi...
        </div>
      ) : recommendations.length === 0 ? (
        <div className="flex items-center justify-center py-8 text-neutral-70">
          Tidak ada rekomendasi yang tersedia
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {recommendations.map((item) => (
            <div
              key={item.skillId}
              className="bg-white rounded-2xl border-l-6 border-primary-pressed shadow-xs p-5 flex flex-col gap-3 hover:shadow-md transition-shadow duration-200"
              onClick={() => {
                setSkill(
                  analytics?.skillsResult.find(
                    (skill) => skill.skillId === item.skillId,
                  ) ?? null,
                );
                setIsOpen(true)
              }}
            >
              <h3 className="font-semibold text-neutral-800 text-base">
                {item.title}
              </h3>
              <p className="text-sm text-neutral-500 leading-relaxed flex-1">
                {item.desc}
              </p>
              <button className="flex items-center gap-1.5 text-sm font-semibold text-primary hover:gap-2.5 transition-all duration-150">
                Mulai Belajar <ArrowRight size={14} />
              </button>
            </div>
          ))}
        </div>
      )}

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold text-neutral-800">
              {skill?.skillName}
            </DialogTitle>
          </DialogHeader>

          {skill ? (
            <div className="flex flex-col gap-4 mt-2">
              {/* Level Info */}
              <div className="flex items-center justify-between rounded-xl p-4">
                <div className="flex flex-col">
                  <span className="text-xs text-neutral-500">Current</span>
                  <span className="text-lg font-semibold text-neutral-800">
                    {skill.finalUserLevel}
                  </span>
                </div>

                <ArrowRight size={20} className="text-neutral-400" />

                <div className="flex flex-col items-end">
                  <span className="text-xs text-neutral-500">Target</span>
                  <span className="text-lg font-semibold text-primary">
                    {skill.requiredLevel}
                  </span>
                </div>
              </div>

              {/* Gap / Insight */}
              <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 text-sm text-neutral-700">
                Kamu perlu meningkatkan skill ini sekitar{" "}
                <span className="font-semibold text-primary">
                  {skill.gapLevel}
                </span>{" "}
                level untuk mencapai target.
              </div>
            </div>
          ) : (
            <div className="text-sm text-neutral-500">Data tidak tersedia</div>
          )}

          <DialogFooter className="mt-4 flex justify-between">
            <DialogClose asChild>
              <Button variant="outline">Baik</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
