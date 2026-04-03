"use client";

import Loader from "@/components/shared/Loader";
import { useAnalytics } from "@/hooks/career-sessions.hooks";
import { CareerSessionItem } from "@/types/common.type";
import { useEffect, useState } from "react";
import { HeroBanner } from "./HeroBanner";
import { OverallScoreCard } from "./OverallScoreCard";
import { RecommendedationSection } from "./RecommendationSection";
import { SelectCareerSessionModal } from "./SelectCareerSessionModal";
import { SkillBreakdown } from "./SkillBreakdown";
import { SkillGrowthChart } from "./SkillGrowthChart";
import { useCareerSessionStore } from "@/stores/useCareerSessionStore";
import privateApi from "@/api/axiosInstance";
import { toCamel } from "@/lib/case";
import { toast } from "sonner";
import { AxiosError } from "axios";
import EmptyScoreCard from "./EmptyScoreCard";
import { EmptyGrowChart } from "./EmptyGrowthChart";
import EmptyBreakdown from "./EmptyBreakdown";

const STORAGE_KEY = "selected-career-session-id";

export default function DashboardHomePage({
  careerSessionList,
}: {
  careerSessionList: CareerSessionItem[];
}) {
  const { careerSessionStatus, setCareerSessionStatus } = useCareerSessionStore()
  const [selectedId, setSelectedId] = useState<string | null>(() => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(STORAGE_KEY);
  });

  const [showModal, setShowModal] = useState(() => {
    if (typeof window === "undefined") return false;
    const stored = localStorage.getItem(STORAGE_KEY);
    return !stored && careerSessionList.length > 1;
  });

  const [isReady, setIsReady] = useState(true);
  const { analytics, isPending } = useAnalytics(selectedId ?? "");

  useEffect(() => {
    if (careerSessionList.length === 1 && !selectedId) {
      const id = careerSessionList[0].careerSessionId;
      localStorage.setItem(STORAGE_KEY, id)
      setSelectedId(id);
    }
  }, []);

  useEffect(() => {
    if (!selectedId) return

    const getCareerSessionStatus = async () => {
      try {
        const response = await privateApi.get(`/career-sessions/${selectedId}`)
        const camelData = toCamel(response.data)

        setCareerSessionStatus(camelData.data.status)
      } catch (error) {
        toast.error(
          error instanceof AxiosError
            ? error.response?.data?.message || "Terjadi kesalahan sistem"
            : (error as Error).message,
        );
      }
    }

    getCareerSessionStatus()
  }, [selectedId])

  const handleSelectSession = (id: string) => {
    localStorage.setItem(STORAGE_KEY, id)
    setSelectedId(id);
    setShowModal(false);
  };

  if (!isReady) return <Loader />;

  return (
    <>
      <SelectCareerSessionModal
        open={showModal}
        sessions={careerSessionList}
        onSelect={handleSelectSession}
      />

      <div className="flex flex-col gap-6 max-w-5xl mx-auto w-full">
        <HeroBanner
          careerName={
            careerSessionList.find(
              (career) => career.careerSessionId === selectedId,
            )?.careerName
          }
        />

        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-5 relative">
          {careerSessionStatus !== "on_learning" ? (
            <EmptyScoreCard length={careerSessionList.length} careerSessionStatus={careerSessionStatus!} selectedId={selectedId!}/>
          ) : (
            <OverallScoreCard totalScore={analytics?.totalScore} selectedId={selectedId!}/>
          )}
          <div className="w-full flex flex-col gap-5">
            {careerSessionStatus !== "on_learning" ? (
              <>
                <EmptyGrowChart />
                <EmptyBreakdown />
              </>
            ) : (
              <>
                <SkillGrowthChart skillsResult={analytics?.skillsResult} />
                <SkillBreakdown topSkills={analytics?.skillsResult} />
              </>
            )}
            
          </div>
        </div>

        {careerSessionStatus === "on_learning" && (
          <RecommendedationSection />
        )}
      </div>
    </>
  );
}
