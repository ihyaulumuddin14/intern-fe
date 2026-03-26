"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { OnboardingSchema } from "@/schemas/onboarding.schema";
import { useOnboardingFormStore } from "@/stores/useOnboardingFormStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const ConfirmationCallbackModal = ({
  namePlaceholder,
}: {
  namePlaceholder: string;
}) => {
  const router = useRouter();
  const [isValid, setIsValid] = useState(false);
  const { formStore, hasHydrated } = useOnboardingFormStore();

  useEffect(() => {
    if (hasHydrated) {
      const result = OnboardingSchema.safeParse(formStore);

      if (!result.success) {
        toast.warning("Tolong lengkapi data dulu ya");
        router.replace("/onboarding");
      } else {
        setIsValid(true);
      }
    }
  }, [hasHydrated]);

  if (!hasHydrated) return null;

  return (
    <Dialog open={isValid}>
      <DialogContent
        onPointerDownOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
        className="[&>button]:hidden"
      >
        <DialogHeader>
          <DialogTitle>Konfirmasi</DialogTitle>
        </DialogHeader>
        <div className="w-full">
          <img
            className="w-1/2 mx-auto"
            src="/gif/goal.gif"
            alt="goal.gif"
          />
        </div>

        <main className="text-center mb-7">
          <h1 className="text-md">
            Persiapanmu hampir matang
            {namePlaceholder ? `, ${namePlaceholder}` : ""}!
          </h1>
          <h2 className="text-2xl sm:text-3xl font-semibold my-2">
            Mau analisis skill sekarang?
          </h2>
          <p className="text-sm text-muted-foreground text-left sm:text-center mt-5">
            Tip: Di tahap analisis skill kamu akan menjalani beberapa assessment, jika pilih nanti aja kamu akan diarahkan ke dashboard
          </p>
        </main>

        <DialogFooter className="flex flex-col sm:flex-col">
          <Button
            size="lg"
            onClick={() => router.push("/assessment")}
            className="w-full"
          >
            Ya, analisis sekarang
          </Button>
          <Button
            size="lg"
            onClick={() => router.push("/dashboard")}
            className="w-full"
            variant="ghost"
          >
            Nanti aja
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmationCallbackModal;
