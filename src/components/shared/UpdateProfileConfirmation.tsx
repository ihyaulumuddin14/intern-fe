"use client";

import { OnboardingFormType } from "@/stores/useOnboardingFormStore";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useCreateCareerSession } from "@/hooks/career-sessions.hooks";
import { useUpdateMe } from "@/hooks/users.hooks";
import { ShieldSearch } from "iconsax-reactjs";
import { useEffect, useState } from "react";

const FIELD_LABELS: Record<string, string> = {
  fullName: "Nama Lengkap",
  educationLevel: "Jenjang Pendidikan",
  major: "Jurusan",
  institution: "Institusi",
};

const getFilledFields = (fields: Record<string, string>) => {
  return Object.fromEntries(
    Object.entries(fields).filter(([, v]) => v?.trim()),
  );
};

export const getOnboardingData = (): OnboardingFormType | null => {
  const raw = localStorage.getItem("onboarding-form");
  if (!raw) return null;
  return JSON.parse(raw)?.state?.formStore ?? null;
};

const UpdateProfileConfirmation = ({
  onNextStep,
  isUpdated = false,
  setIsUpdated,
}: {
  onNextStep?: () => void;
  isUpdated: boolean;
  setIsUpdated?: (isUpdated: boolean) => void;
}) => {
  const router = useRouter();
  const { isPending: isPendingCreateCareerSession } = useCreateCareerSession();
  const { mutateAsync: mutateUpdateMe, isPending: isPendingUpdateMe } = useUpdateMe();
  const [changedFields, setChangedFields] = useState<Record<
    string,
    string
  > | null>(null);

  useEffect(() => {
    if (!isUpdated) return;

    const formStore = getOnboardingData();
    if (!formStore) return;

    const { education, fullName } = formStore;
    const filled = getFilledFields({ ...education, fullName });

    setChangedFields(Object.keys(filled).length > 0 ? filled : null);
  }, [isUpdated]);

  const handleUpdateUser = async () => {
    const dataString = localStorage.getItem("onboarding-form");
    if (!dataString) {
      toast.error("Data tidak ditemukan");
      return router.replace("/dashboard");
    }

    const data = JSON.parse(dataString);
    const formStore = data?.state?.formStore;
    const { education, fullName, ...rest } = formStore;

    const credentials = { ...education, fullName };

    await mutateUpdateMe(credentials, {
      onSuccess: () => {
        if (onNextStep) {
          onNextStep();
        } else {
          setIsUpdated && setIsUpdated(false);
        }
      }
    });
  };

  return (
    <Dialog open={isUpdated}>
      <DialogContent
        onPointerDownOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
        className="[&>button]:hidden"
      >
        <DialogHeader>
          <DialogTitle>Konfirmasi</DialogTitle>
          <div className="w-full flex justify-center mt-7">
            <ShieldSearch size="100" />
          </div>
        </DialogHeader>

        <main className="text-center mb-7">
          <h1 className="text-xl font-semibold">Perubahan data terdeteksi</h1>
          <p className="text-base text-muted-foreground mb-3">
            Data yang akan diubah
          </p>

          <ul className="flex flex-col gap-2">
            {changedFields &&
              Object.entries(changedFields).map(([key, value]) => (
                <ListWillChangeData
                  key={key}
                  keyLabel={key}
                  value={value}
                />
              ))}
          </ul>
        </main>

        <DialogFooter className="flex flex-col sm:flex-col">
          <Button
            size="lg"
            disabled={isPendingUpdateMe}
            onClick={handleUpdateUser}
            className="w-full"
          >
            {isPendingUpdateMe ? "Sedang mengubah..." : "Ya, ubah data"}
          </Button>
          <Button
            size="lg"
            onClick={() => {
              if (onNextStep) onNextStep();
              else if (setIsUpdated) setIsUpdated(false);
            }}
            className="w-full"
            variant="ghost"
          >
            {isPendingCreateCareerSession ? "Melanjutkan..." : "Jangan ubah"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateProfileConfirmation;



const ListWillChangeData = ({
  keyLabel,
  value,
}: {
  keyLabel: string;
  value: string;
}) => {
  return (
    <li className="flex items-start gap-3 bg-muted/40 border border-border rounded-xl px-3 py-2.5">
      <span className="w-1.5 h-1.5 rounded-full bg-primary-border mt-1.75 shrink-0" />
      <div className="min-w-0 text-left">
        <p className="text-[11px] text-muted-foreground font-medium">
          {FIELD_LABELS[keyLabel] ?? keyLabel}
        </p>
        <p className="text-sm font-medium text-foreground truncate">{keyLabel !== "fullName" ? value.toUpperCase() : value}</p>
      </div>
    </li>
  );
};
