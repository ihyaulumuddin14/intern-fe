import Link from "next/link";
import { ReactNode } from "react";

const NavLink = ({
  children,
  href,
  isActive = false,
}: {
  children: ReactNode;
  href: string;
  isActive: boolean;
}) => {
  return (
    <Link
      className={`text-md xl:text-xl font-normal ${isActive ? "font-semibold" : ""} transition-all duration-200 ease-[cubic-bezier(0.19,1,0.22,1)]`}
      href={href}
    >
      {children}
    </Link>
  );
};

export default NavLink;
