"use client";

import { useOnboardingStep } from "@/stores/useOnboardingStep";
import { motion } from "motion/react";
import { ReactNode } from "react";

export default function FormStepCard({
  title,
  children,
}: {
  title: ReactNode;
  children: ReactNode;
}) {
  const { direction } = useOnboardingStep();
  const container = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.18,
      },
    },
    exit: {
      transition: {
        staggerChildren: 0.12,
        staggerDirection: -1,
      },
    },
  };

  const variants = {
    initial: (dir: "forward" | "backward") => ({
      opacity: 0,
      x: dir === "forward" ? 200 : -200,
    }),
    animate: {
      opacity: 1,
      x: 0,
    },
    exit: (dir: "forward" | "backward") => ({
      opacity: 0,
      x: dir === "forward" ? -200 : 200,
    }),
  };

  return (
    <motion.main
      custom={direction}
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{
        duration: 1.5,
        ease: [0.9, 0, 0.1, 1],
        type: "tween",
      }}
    >
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="w-full max-w-3xl mx-auto flex flex-col items-center gap-10"
      >
        <motion.h2
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                duration: 1.3,
                ease: [0.9, 0, 0.1, 1],
                type: "tween",
              },
            },
            exit: {
              opacity: 0,
              y: -20,
              transition: {
                duration: 1.3,
                ease: [0.9, 0, 0.1, 1],
                type: "tween",
              },
            },
          }}
          className="text-4xl sm:text-5xl md:text-[64px] leading-tight font-semibold text-center"
        >
          {title}
        </motion.h2>

        <motion.div
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.7,
                ease: [0.9, 0, 0.1, 1],
                type: "tween",
              },
            },
            exit: {
              opacity: 0,
              y: -20,
              transition: {
                duration: 0.5,
                ease: [0.9, 0, 0.1, 1],
                type: "tween",
              },
            },
          }}
          className="w-full max-w-137.75"
        >
          {children}
        </motion.div>
      </motion.div>
    </motion.main>
  );
}
