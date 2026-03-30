"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useCreateSelfAssessment } from "@/hooks/career-sessions.hooks";
import { SelfAssessmentCredentials, SkillRating } from "@/schemas/career-sessions.schema";
import { useRouter } from "next/navigation";

const ConfirmationQuizModal = ({
  skillRatings,
  careerSessionId
}: {
  skillRatings: SkillRating[];
  careerSessionId: string
}) => {
  const router = useRouter();
  const { mutate, isPending } = useCreateSelfAssessment()

  const handleSelfAssessmentSubmit = async () => {
    const credentials: SelfAssessmentCredentials["skillRatings"] = {
      ...skillRatings.map(skillRating => {
        return {
          skillId: skillRating.skillId,
          userLevel: skillRating.userLevel
        }
      })
    }
    mutate({credentials, careerSessionId})
  }

  return (
    <Dialog defaultOpen>
      <DialogContent
        onPointerDownOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
        className="[&>button]:hidden"
      >
        <DialogHeader>
          <DialogTitle>Konfirmasi Kuis</DialogTitle>
        </DialogHeader>
        <div className="w-full">
          <img
            className="w-1/2 mx-auto"
            src="/gif/evaluate.gif"
            alt="evaluate.gif"
          />
        </div>

        <main className="text-center mb-7">
          <p className="text-sm text-muted-foreground text-left sm:text-center mt-5">
            Tip: Sangat tidak disarankan untuk keluar ketika sesi kuis berlangsung. Tapi tenang, setiap jawaban akan otomatis tersimpan ketika lanjut ke soal berikutnya.
          </p>
        </main>

        <DialogFooter className="flex flex-col sm:flex-col">
          <Button
            size="lg"
            onClick={handleSelfAssessmentSubmit}
            className="w-full"
            disabled={isPending}
          >
            {isPending ? "...Memulai" : "Mulai Kuis"}
          </Button>
          <Button
            size="lg"
            onClick={() => router.back()}
            className="w-full"
            variant="ghost"
          >
            Kembali
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmationQuizModal;
