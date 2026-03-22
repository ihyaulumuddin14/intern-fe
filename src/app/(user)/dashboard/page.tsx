"use client";

import { Button } from "@/components/ui/button";
import { useLogout } from "@/hooks/auth.hooks";

export default function UserDashboardPage() {
  const { mutate, isPending } = useLogout();

  const handleLogout = () => mutate();

  return (
    <section>
      User Dashboard Page
      <Button
        variant={"destructive"}
        disabled={isPending}
        onClick={handleLogout}
      >
        {isPending ? "..." : "Logout"}
      </Button>
    </section>
  );
}
