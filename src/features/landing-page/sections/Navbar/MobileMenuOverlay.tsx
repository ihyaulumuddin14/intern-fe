"use client";

import { useActiveSection, useIsMobile } from "@/hooks/animation.hooks";
import { useLandingPageMenuStore } from "@/stores/useLandingPageMenuStore";
import { AnimatePresence, motion } from "motion/react";
import { useEffect } from "react";
import { NAVBAR_LINKS } from "../../constants";
import NavLink from "./NavLink";

const MobileMenuOverlay = () => {
  const { isOpen, close } = useLandingPageMenuStore();
  const isMobile = useIsMobile();

  const sectionIds = NAVBAR_LINKS.map((link) =>
    link.href.replace("#", ""),
  ).filter(Boolean);
  const activeSection = useActiveSection(sectionIds);

  useEffect(() => {
    if (!isMobile && isOpen) {
      close();
    }
  }, [isMobile]);

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.3, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.2, delay: 0.3 },
    },
  } as const;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
    exit: {
      opacity: 0,
      x: 20,
      transition: { duration: 0.2 },
    },
  } as const;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={() => close()}
          className="w-full h-dvh top-22 z-50 fixed bg-neutral-100/50 backdrop-blur-sm"
        >
          <motion.nav
            variants={containerVariants}
            className="flex flex-col gap-6 p-10 bg-background"
            onClick={(e) => e.stopPropagation()}
          >
            {NAVBAR_LINKS.map((link) => {
              const id = link.href.replace("#", "");
              const isActive = activeSection === id;

              return (
                <motion.div
                  key={link.id}
                  variants={itemVariants}
                  onClick={close}
                >
                  <NavLink isActive={isActive} href={link.href}>
                    {link.label}
                  </NavLink>
                </motion.div>
              );
            })}
          </motion.nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileMenuOverlay;
