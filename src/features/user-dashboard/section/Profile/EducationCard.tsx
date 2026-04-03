import { Button } from "@/components/ui/button"
import { EducationCredentials } from "@/schemas/onboarding.schema"
import { Building2, GraduationCap } from "lucide-react"
import CardContainer from "./CardContainer"

export function EducationCard({
  education,
  onEdit,
}: {
  education: EducationCredentials
  onEdit: () => void
}) {
  return (
    <CardContainer title="Status Edukasi">
      <div className="flex items-start gap-4">
        <div className="w-24 h-24 rounded-xl flex items-center justify-center shrink-0">
          <Building2 size={40} className="text-primary" />
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="font-semibold text-neutral-800 text-base sm:text-base">
            {education.institution || "-"}
          </span>
          <span className="text-base text-neutral-500">{education?.major || "-"}</span>
          <span className="text-sm text-neutral-400 mt-1">{education?.educationLevel?.toUpperCase()}</span>
        </div>
      </div>
 
      <div className="mt-auto">
        <Button onClick={onEdit} className="gap-2">
          Edit Edukasi
        </Button>
      </div>
    </CardContainer>
  )
}