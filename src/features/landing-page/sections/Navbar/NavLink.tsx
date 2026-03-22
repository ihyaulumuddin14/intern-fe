"use client";

import { useLenis } from "lenis/react";
import Link from "next/link";
import { ReactNode, useEffect } from "react";

const NavLink = ({
  children,
  href,
  isActive = false,
}: {
  children: ReactNode;
  href: string;
  isActive?: boolean;
}) => {
  const lenis = useLenis();

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!lenis) return;
    if (lenis.isStopped) {
      lenis.start();
    }

    e.preventDefault();
    lenis.scrollTo(href, { offset: -80 });
  };

  return (
    <Link
      onClick={(e) => handleScroll(e)}
      className={`text-md xl:text-xl font-normal ${isActive ? "font-semibold" : ""} transition-all duration-200 ease-[cubic-bezier(0.19,1,0.22,1)]`}
      href={href}
    >
      {children}
    </Link>
  );
};

export default NavLink;
