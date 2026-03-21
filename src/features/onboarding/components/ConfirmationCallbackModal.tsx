"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog";
import { OnboardingSchema } from "@/schemas/onboarding.schema";
import { useOnboardingForm } from "@/stores/useOnboardingForm";
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
  const { formStore, hasHydrated } = useOnboardingForm();

  useEffect(() => {
    if (hasHydrated) {
      const result = OnboardingSchema.safeParse(formStore);

      if (!result.success) {
        toast.error("Tolong lengkapi data dulu ya");
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
          <h2 className="text-3xl font-semibold">
            Mau analisis skill sekarang?
          </h2>
          <p className="text-sm text-muted-foreground mt-5">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Explicabo,
            voluptate?
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
