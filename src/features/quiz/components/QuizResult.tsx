"use client";

import Loader from "@/components/shared/Loader";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAnalytics } from "@/hooks/career-sessions.hooks";
import { useRouter } from "next/navigation";

const SCORE_THRESHOLD = 75;

const QuizResult = ({ careerSessionId }: { careerSessionId: string }) => {
  const router = useRouter();
  const { analytics, isPending } = useAnalytics(careerSessionId);

  const handleBackToDashboard = () => {
    sessionStorage.removeItem("quiz-session-storage");
    router.replace("/dashboard");
  };

  const totalScore = analytics?.totalScore ?? 0;
  const skillsResult = analytics?.skillsResult ?? [];
  const isPassed = totalScore >= SCORE_THRESHOLD;
  const topSkills = skillsResult.slice(0, 4);

  return (
    <Dialog defaultOpen>
      <DialogContent
        onPointerDownOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
        className="[&>button]:hidden"
      >
        {isPending || !analytics ? (
          <div className="flex items-center justify-center py-16">
            <Loader />
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>
                {isPassed
                  ? "Selamat, kamu berhasil!"
                  : "Jangan menyerah, Terus berlatih!"}
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
                  style={{
                    opacity: 1 - i * 0.25,
                    filter: `blur(${i}px)`,
                  }}
                  className="flex justify-between items-center bg-muted/40 border border-border rounded-xl px-3 py-2.5"
                >
                  <span className="text-sm text-muted-foreground">
                    {skill.skillName}
                  </span>
                  <span className="text-sm font-medium text-foreground">
                    {skill.skillScore}%
                  </span>
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
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default QuizResult;
