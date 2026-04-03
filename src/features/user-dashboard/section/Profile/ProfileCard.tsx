import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { User } from "@/types/entities.type"
import { User as UserIcon } from "iconsax-reactjs"
import CardContainer from "./CardContainer"

export function ProfileCard({
  profile,
  onEdit,
}: {
  profile: User
  onEdit: () => void
}) {
  return (
    <CardContainer title="Informasi Pribadi">
      <div className="flex flex-col sm:flex-row items-start gap-5">
        {/* Avatar */}
        <div className="w-24 h-28 sm:w-36.5 sm:h-45 rounded-xl overflow-hidden bg-neutral-20 border border-neutral-200 shrink-0 flex items-center justify-center">
          <UserIcon size={40} className="text-neutral-300" />
        </div>
 
        {/* Info */}
        <div className="w-full h-full flex flex-col gap-2 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[20px] font-bold text-primary">
              {profile?.fullName}
            </span>
            <Badge
              variant="outline"
              className="text-xs text-neutral-500 border-neutral-300 font-normal px-3 py-2 rounded-sm"
            >
              {profile?.isPremium ? "Premium Plan" : "Free Plan"}
            </Badge>
          </div>
          <span className="w-full text-base line-clamp-1 text-primary-pressed">{profile?.email}</span>

          <Button onClick={onEdit} className="gap-2 w-fit mt-auto">
            Edit Profil
          </Button>
        </div>
      </div>
    </CardContainer>
  )
}