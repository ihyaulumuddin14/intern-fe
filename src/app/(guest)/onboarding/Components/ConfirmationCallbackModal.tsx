"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";

const ConfirmationCallbackModal = ({
  open,
  onOpenChange,
  namePlaceholder,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  namePlaceholder: string;
}) => {
  const router = useRouter()
  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
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
            onClick={() => router.push("/assessment")}
            className="w-full">Ya, analisis sekarang</Button>
          <Button
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
