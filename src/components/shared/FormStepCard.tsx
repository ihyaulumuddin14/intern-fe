"use client";

import { StepDirection } from "@/types/common.type";
import { motion } from "motion/react";
import { ReactNode } from "react";

export default function FormStepCard({
  title,
  children,
  direction
}: {
  title: ReactNode;
  children: ReactNode;
  direction: StepDirection
}) {
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
    initial: () => ({
      opacity: 0,
      y: 100,
    }),
    animate: {
      opacity: 1,
      y: 0,
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
      className="w-full"
    >
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="w-full mx-auto flex flex-col items-center gap-14"
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
          className="w-full text-3xl sm:text-4xl md:text-5xl leading-tight font-semibold"
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
          className="w-full flex justify-center"
        >
          {children}
        </motion.div>
      </motion.div>
    </motion.main>
  );
}
