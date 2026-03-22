"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const StartedButton = () => {
  const router = useRouter();

  return (
    <Button
      onClick={() => router.push("/onboarding")}
      withArrow
      size={"lg"}
    >
      Get Started
    </Button>
  );
};

export default StartedButton;
