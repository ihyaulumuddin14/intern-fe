"use client";

import { useUpdateMe, useUser } from "@/hooks/users.hooks";
import { ProfileCredentials } from "@/schemas/user.schema";
import { useState } from "react";
import { EditProfileModal } from "./EditProfileModal";
import { EditEducationModal } from "./EditEducationModal";
import { ProfileCard } from "./ProfileCard";
import { EducationCard } from "./EducationCard";
import { EducationCredentials } from "@/schemas/onboarding.schema";
import { Button } from "@/components/ui/button";
import { DeleteAccountModal } from "./DeleteAccountModal";

export default function DashboardProfilePage() {
  const { user } = useUser();

  const { mutate: mutateUpdateMe } = useUpdateMe();
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [educationModalOpen, setEducationModalOpen] = useState(false);
  const [deleteMeModalOpen, setDeletMeModalOpen] = useState(false);

  const handleSaveProfile = (credentials: ProfileCredentials) => {
    mutateUpdateMe(credentials);
    setProfileModalOpen(false);
  };

  const handleSaveEducation = (credentials: EducationCredentials) => {
    mutateUpdateMe(credentials);
    setEducationModalOpen(false);
  };

  return (
    <div className="flex flex-col gap-6 max-w-5xl mx-auto">
      <div className="flex items-center gap-2 text-xl sm:text-[24px]">
        <span className="font-semibold text-primary">Profil</span>
        <span className="text-neutral-400">&gt;</span>
        <span className="text-neutral-500">Umum</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <ProfileCard
          profile={user}
          onEdit={() => setProfileModalOpen(true)}
        />
        <EducationCard
          education={{
            educationLevel: user?.educationLevel,
            major: user?.major,
            institution: user?.institution,
          }}
          onEdit={() => setEducationModalOpen(true)}
        />
      </div>

      <Button
        variant={"destructive"}
        onClick={() => setDeletMeModalOpen(true)}
        className="w-fit mt-10"
      >
        Hapus akun
      </Button>

      <DeleteAccountModal
        onClose={() => setDeletMeModalOpen(false)}
        open={deleteMeModalOpen}
      />

      <EditProfileModal
        open={profileModalOpen}
        onClose={() => setProfileModalOpen(false)}
        defaultValues={{ fullName: user?.fullName, email: user?.email }}
        onSave={handleSaveProfile}
      />

      <EditEducationModal
        open={educationModalOpen}
        onClose={() => setEducationModalOpen(false)}
        defaultValues={{
          educationLevel: user?.educationLevel,
          institution: user?.institution,
          major: user?.major,
        }}
        onSave={handleSaveEducation}
      />
    </div>
  );
}
