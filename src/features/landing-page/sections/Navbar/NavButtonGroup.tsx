"use client";

import { Button } from "@/components/ui/button";
import useUser from "@/hooks/users.hooks";
import { useRouter } from "next/navigation";

const NavButtonGroup = () => {
  const { user } = useUser();
  const router = useRouter();

  return (
    <ul className="flex gap-4 items-center">
      {user ? (
        <Button
          onClick={() =>
            router.push(user.role === "ADMIN" ? "/admin" : "/dashboard")
          }
        >
          Go to Dashboard
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
      )}
    </ul>
  );
};

export default NavButtonGroup;
