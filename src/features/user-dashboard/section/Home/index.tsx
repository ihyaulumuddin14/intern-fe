import { HeroBanner } from "./HeroBanner";
import { OverallScoreCard } from "./OverallScoreCard";
import { RecommendedationSection } from "./RecommendationSection";
import { SkillBreakdown } from "./SkillBreakdown";
import { SkillGrowthChart } from "./SkillGrowthChart";

export default function DashboardHomePage() {
  return (
    <div className="flex flex-col gap-6 max-w-5xl mx-auto w-full">
      {/* Hero */}
      <HeroBanner />
 
      {/* Score + Chart row */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-5 relative">
        <OverallScoreCard />
        <div className="w-full flex flex-col gap-5">
          <SkillGrowthChart />  
          <SkillBreakdown />
        </div>
      </div>
 
      {/* Recommended */}
      <RecommendedationSection />
    </div>
  )
}