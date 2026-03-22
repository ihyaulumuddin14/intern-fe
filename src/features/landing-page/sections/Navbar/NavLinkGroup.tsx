"use client";

import { useActiveSection } from "@/hooks/animation.hooks";
import { NAVBAR_LINKS } from "../../constants";
import NavLink from "./NavLink";

const NavLinkGroup = () => {
  const sectionIds = NAVBAR_LINKS.map((link) =>
    link.href.replace("#", ""),
  ).filter(Boolean);
  const activeSection = useActiveSection(sectionIds);

  return (
    <ul className="hidden lg:flex items-center gap-10.5 ">
      {NAVBAR_LINKS.map((link) => {
        const id = link.href.replace('#', '')
        const isActive = activeSection === id

        return (
          <NavLink
            isActive={isActive}
            key={link.id}
            href={link.href}
          >
            {link.label}
          </NavLink>
        )
      })}
    </ul>
  );
};

export default NavLinkGroup;
