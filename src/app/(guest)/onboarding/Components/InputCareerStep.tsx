"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Field, FieldGroup } from "@/components/ui/field";
import { useOnboardingStep } from "@/stores/useOnboardingStep";
import { Career } from "@/types/type";
import { motion } from "motion/react";
import { Controller, useWatch, useFormContext } from "react-hook-form";

export default function InputCareerStep({
  careers
}: {
  careers: Career[]
}) {
  const { direction } = useOnboardingStep()
  const { control } = useFormContext()
  const career = useWatch({
    control,
    name: "career"
  })

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
          Apa karir yang kamu inginkan?
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
              <Controller
                name="career"
                control={control}
                render={({ field }) => (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button>{career ? career : "Pilihan Karir"}</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      {careers.map((career) => (
                        <DropdownMenuItem
                          key={career.name}
                          onSelect={() => field.onChange(career.name)}
                        >
                          {career.name}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              ></Controller>
            </Field>
            <Field>
              <Button type="submit">Submit</Button>
            </Field>
          </FieldGroup>
        </motion.div>
      </motion.div>
    </motion.main>
  );
}
