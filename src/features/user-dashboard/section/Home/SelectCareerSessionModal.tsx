"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils"; // Pastikan kamu punya helper cn
import { CareerSessionItem } from "@/types/common.type";
import { useEffect, useState } from "react";

interface Props {
  open: boolean;
  sessions: CareerSessionItem[];
  onSelect: (careerSessionId: string) => void;
}

export const SelectCareerSessionModal = ({
  open,
  sessions,
  onSelect,
}: Props) => {
  const [selected, setSelected] = useState<string>("");

  useEffect(() => {
    if (sessions.length > 0 && !selected) {
      setSelected(sessions[0].careerSessionId);
    }
  }, [sessions]);

  const handleConfirm = () => {
    if (selected) onSelect(selected);
  };

  return (
    <Dialog open={open}>
      <DialogContent
        onPointerDownOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
        className="[&>button]:hidden max-w-md"
      >
        <DialogHeader>
          <DialogTitle>Pilih Career Session</DialogTitle>
          <p className="text-sm text-muted-foreground mt-1">
            Pilih satu sesi untuk ditampilkan di dashboard.
          </p>
        </DialogHeader>

        {/* Gunakan value dan onValueChange pada RadioGroup */}
        <RadioGroup
          value={selected}
          onValueChange={setSelected}
          className="flex flex-col gap-3 mt-2"
        >
          {sessions.map((session) => (
            <div
              key={session.careerSessionId}
              onClick={() => setSelected(session.careerSessionId)} // Paksa update state saat container diklik
              className={cn(
                "flex items-center gap-3 border rounded-xl px-4 py-3 cursor-pointer transition-all",
                selected === session.careerSessionId
                  ? "border-primary bg-primary/5"
                  : "border-border hover:bg-muted/40",
              )}
            >
              <RadioGroupItem
                value={session.careerSessionId}
                id={session.careerSessionId}
              />
              <span>{session.careerName}</span>
              <Badge>
                {session.status
                  .split("_")
                  .map((word) =>
                    word.charAt(0).toUpperCase().concat(word.substring(1)),
                  )
                  .join(" ")}
              </Badge>
            </div>
          ))}
        </RadioGroup>

        <DialogFooter className="mt-4">
          <Button
            size="lg"
            className="w-full"
            onClick={handleConfirm}
            disabled={!selected}
          >
            Tampilkan Dashboard
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
