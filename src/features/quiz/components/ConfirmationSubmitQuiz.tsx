"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useSubmitQuiz } from "@/hooks/quiz.hooks";
import { useQuizStore } from "@/stores/useQuizStore";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const ConfirmationSubmitQuiz = () => {
  const router = useRouter();
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { mutateAsync: mutateSubmitQuiz, isPending: isPendingSubmitQuiz } = useSubmitQuiz()
  const { quizSessionId } = useQuizStore()

  const handleResult = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("status", "result");

    router.replace(`${pathname}?${params.toString()}`);
  };

  const handleQuizSubmit = async () => {
    if (!quizSessionId) return

    await mutateSubmitQuiz(quizSessionId, {
      onSuccess: handleResult
    })
  }

  return (
    <Dialog defaultOpen>
      <DialogContent
        onPointerDownOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
        className="[&>button]:hidden"
      >
        <DialogHeader>
          <DialogTitle>Selesaikan Kuis</DialogTitle>
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
            Kirim jawaban kuis kamu untuk menerima hasil skornya!
          </p>
        </main>

        <DialogFooter className="flex flex-col sm:flex-col">
          <Button
            size="lg"
            onClick={handleQuizSubmit}
            className="w-full"
            disabled={isPendingSubmitQuiz}
          >
            {isPendingSubmitQuiz ? "Mengirim jawaban..." : "Kirim"}
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

export default ConfirmationSubmitQuiz;
