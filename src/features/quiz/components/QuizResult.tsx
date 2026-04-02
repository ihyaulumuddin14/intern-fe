"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { useQuizResultStore } from "@/stores/useQuizResultStore";
import { useEffect, useState } from "react";
import Loader from "@/components/shared/Loader";

const SCORE_THRESHOLD = 75;

const QuizResult = () => {
  const router = useRouter();
  const { result, clearResult, hasHydrated } = useQuizResultStore();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!hasHydrated) return;

    const timer = setTimeout(() => {
      setIsReady(true);
    }, 100);

    return () => clearTimeout(timer);
  }, [hasHydrated]);

  useEffect(() => {
    if (isReady && !result) {
      router.replace("/dashboard");
    }
  }, [isReady, result, router]);

  if (!hasHydrated || !isReady || !result) {
    return (
      <div className="w-full h-dvh flex items-center justify-center">
        <Loader size="lg" />
      </div>
    );
  }

  const { totalScore, skillsResult } = result;
  const isPassed = totalScore >= SCORE_THRESHOLD;
  const topSkills = skillsResult.slice(0, 4);

  const handleBackToDashboard = () => {
    sessionStorage.removeItem("quiz-session-storage")
    clearResult()
    router.replace("/dashboard")
  }

  return (
    <Dialog defaultOpen>
      <DialogContent
        onPointerDownOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
        className="[&>button]:hidden"
      >
        <DialogHeader>
          <DialogTitle>
            {isPassed ? "Selamat, kamu berhasil!" : "Jangan menyerah, Terus berlatih!"}
          </DialogTitle>
        </DialogHeader>

        <main className="text-center mb-7">
          <p className="text-sm text-muted-foreground">Tingkat Kesiapan</p>
          <p className="text-7xl font-semibold">{totalScore}%</p>
        </main>

        <ul className="w-full h-fit flex flex-col gap-2 relative pb-8">
          {topSkills.map((skill, i) => (
            <li
              key={skill.skillId}
              style={{ opacity: 1 - i * 0.25, filter: `blur(${i}px)`, }}
              className="flex justify-between items-center bg-muted/40 border border-border rounded-xl px-3 py-2.5"
            >
              <span className="text-sm text-muted-foreground">{skill.skillName}</span>
              <span className="text-sm font-medium text-foreground">{skill.skillScore}%</span>
            </li>
          ))}

          <p className="text-center text-sm text-muted-foreground absolute bottom-0 left-1/2 -translate-x-1/2 w-full">
            Lihat selengkapnya di dashboard
          </p>
        </ul>

        <DialogFooter className="flex flex-col sm:flex-col">
          <Button
            size="lg"
            onClick={handleBackToDashboard}
            className="w-full"
          >
            Kembali ke dashboard
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default QuizResult;