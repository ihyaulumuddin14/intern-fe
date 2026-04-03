import DashboardHomePage from "@/features/user-dashboard/section/Home";
import { toCamel } from "@/lib/case";
import { serverApi } from "@/lib/serverApi";
import { CareerSessionItem } from "@/types/common.type";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard Pengguna | SkillGap",
  description:
    "Kelola sesi karier, pantau perkembangan kompetensi, dan lihat rekomendasi pengembangan diri Anda di dashboard SkillGap.",
  keywords: ["dashboard", "sesi karier", "kompetensi", "perkembangan diri"],
};

const getCareerSessionsListServer = async () => {
  const api = await serverApi();
  const response = await api.get(`/career-sessions`);

  const sessions = toCamel(response.data.data);
  return sessions as CareerSessionItem[];
};

export default async function UserDashboardPage() {
  const careerSessionsList: CareerSessionItem[] =
    await getCareerSessionsListServer();

  return (
    <>
      <DashboardHomePage careerSessionList={careerSessionsList} />
    </>
  );
}
