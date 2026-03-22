"use client";

import { useLenis } from "lenis/react";
import Link from "next/link";
import { ReactNode } from "react";

const NavLinkFooter = ({
  children,
  href,
}: {
  children: ReactNode;
  href: string;
}) => {
  const lenis = useLenis();

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!lenis) return;

    e.preventDefault();
    lenis.scrollTo(href, { offset: -80 });
  };

  return (
    <Link
      onClick={(e) => handleScroll(e)}
      className=""
      href={href}
    >
      {children}
    </Link>
  );
};

export default NavLinkFooter;
