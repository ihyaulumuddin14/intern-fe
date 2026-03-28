"use client";

import Skeleton from "@/components/shared/Skeleton";
import { Button } from "@/components/ui/button";
import useUser from "@/hooks/users.hooks";
import { useRouter } from "next/navigation";

const NavButtonGroup = () => {
  const { user, isPending } = useUser();
  const router = useRouter();

  return (
    <ul className="flex gap-4 items-center">

      {isPending ? (
        <Skeleton className="w-30.25 h-10"/>
      ) : (
        user ? (
          <Button
            onClick={() =>
              router.push(user.role === "ADMIN" ? "/admin" : "/dashboard")
            }
          >
            Dashboard
          </Button>
        ) : (
          <>
            <Button
              variant={"outline"}
              onClick={() => router.push("/login")}
            >
              Masuk
            </Button>
            <Button
              className="hidden xl:inline-flex"
              onClick={() => router.push("/register")}
            >
              Register
            </Button>
          </>
        )
      )}
    </ul>
  );
};

export default NavButtonGroup;
