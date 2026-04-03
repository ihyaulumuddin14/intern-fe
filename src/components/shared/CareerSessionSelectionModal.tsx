"use client";

import { CareerSessionItem } from "@/types/common.type";
import { useCareerSessionSelectionStore } from "@/stores/useCareerSessionSelectionStore";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface CareerSessionSelectionModalProps {
  sessions: CareerSessionItem[] | undefined;
  isLoading?: boolean;
}

export function CareerSessionSelectionModal({
  sessions,
  isLoading = false,
}: CareerSessionSelectionModalProps) {
  const { isModalOpen, closeModal, selectSession } = useCareerSessionSelectionStore();
  const [selectedId, setSelectedId] = useState<string>("");

  const handleSelect = () => {
    if (!selectedId || !sessions) return;
    
    const selected = sessions.find((s) => s.careerSessionId === selectedId);
    if (selected) {
      selectSession(selected);
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={closeModal}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Pilih Sesi Karier</DialogTitle>
          <DialogDescription>
            Anda memiliki lebih dari satu sesi karier. Silakan pilih salah satu untuk melanjutkan.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3">
          {isLoading ? (
            <div className="text-center py-8">
              <p className="text-sm text-muted-foreground">Memuat data...</p>
            </div>
          ) : sessions && sessions.length > 0 ? (
            <>
              {sessions.map((session) => (
                <div
                  key={session.careerSessionId}
                  className={`p-4 border rounded-lg cursor-pointer transition-all ${
                    selectedId === session.careerSessionId
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  }`}
                  onClick={() => setSelectedId(session.careerSessionId)}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      id={session.careerSessionId}
                      name="careerSession"
                      value={session.careerSessionId}
                      checked={selectedId === session.careerSessionId}
                      onChange={() => setSelectedId(session.careerSessionId)}
                      className="w-4 h-4"
                    />
                    <label
                      htmlFor={session.careerSessionId}
                      className="flex-1 cursor-pointer"
                    >
                      <p className="font-medium">{session.careerName}</p>
                      <p className="text-xs text-muted-foreground">
                        Status: <span className="capitalize">{session.status.replace(/_/g, " ")}</span>
                      </p>
                    </label>
                  </div>
                </div>
              ))}
              
              <Button
                onClick={handleSelect}
                disabled={!selectedId}
                className="w-full mt-4"
              >
                Lanjutkan
              </Button>
            </>
          ) : (
            <div className="text-center py-8">
              <p className="text-sm text-muted-foreground">Tidak ada sesi karier yang ditemukan.</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
