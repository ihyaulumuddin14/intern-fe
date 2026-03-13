"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useOnboardingStep } from "@/stores/useOnboardingStep";
import { motion } from "motion/react";
import { useFormContext } from "react-hook-form";

export default function InputNameStep() {
  const { direction } = useOnboardingStep();
  const { register } = useFormContext()

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

  return (
    <motion.main
      initial={{
        opacity: 0,
        x: direction === "forward" ? 200 : -200,
        scale: 0.6,
      }}
      animate={{
        opacity: 1,
        x: 0,
        scale: 1,
      }}
      exit={{
        opacity: 0,
        x: direction === "forward" ? -200 : 200,
        scale: 0.6,
      }}
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
        className="w-full max-w-lg mx-auto flex flex-col items-center gap-10"
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
          className="text-7xl font-bold text-center"
        >
          Siapa nama kamu?
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
          className="w-full max-w-sm"
        >
          <FieldGroup>
            <Field>
              <Input
                className="w-full"
                id="name-input"
                placeholder="someone"
                required
                {...register("full_name")}
              />
            </Field>
            {/* <Field>
              <Button>Continue</Button>
            </Field> */}
          </FieldGroup>
        </motion.div>
      </motion.div>
    </motion.main>
  );
}
