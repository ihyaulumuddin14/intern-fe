'use client'

import { SelfAssessmentCredentials, SelfAssessmentSchema } from '@/schemas/career-sessions.schema'
import { Skill } from '@/types/entities.type'
import { zodResolver } from '@hookform/resolvers/zod'
import { AnimatePresence } from 'motion/react'
import { FormProvider, useForm } from 'react-hook-form'
import InputSkills from '../components/InputSkills'
import InputSkillLevel from '../components/InputSkillLevel'
import { useSelfAssessmentStepStore } from '@/stores/useSelfAssessmentStepStore'
import { useShallow } from 'zustand/react/shallow'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useSelfAssessmentFormStore } from '@/stores/useSelfAssessmentFormStore'
import { useEffect } from 'react'
import { StepIndicator } from '@/features/onboarding/components/StepIndicator'
import ConfirmationQuizModal from '../components/ConfirmationQuizModal'

export default function SelfAssessmentContainer({
  skills
}: {
  skills: Skill[]
}) {
  const router = useRouter()
  const pathname = usePathname()

  // manage params
  const searchParams = useSearchParams()
  const status = searchParams.get("status")

// synchronize RHF form and zustand state from localStorage
  const {
    formStore,
    setForm,
    hasHydrated: formHasHydrated,
  } = useSelfAssessmentFormStore(
    useShallow((state) => ({
      formStore: state.formStore,
      setForm: state.setForm,
      hasHydrated: state.hasHydrated,
    })),
  );

  // synchronize number of step from sessionStorage persist
  const {
    noStep,
    direction,
    setStep,
    hasHydrated: stepHasHydrated,
  } = useSelfAssessmentStepStore(
    useShallow((state) => ({
      noStep: state.noStep,
      direction: state.direction,
      setStep: state.setStep,
      hasHydrated: state.hasHydrated,
    })),
  );

  const form = useForm<SelfAssessmentCredentials>({
    resolver: zodResolver(SelfAssessmentSchema),
    mode: "onChange",
    defaultValues: formStore as SelfAssessmentCredentials
  })

/**
   * Auto hydrate form field from zustand persist at mount
   */
  useEffect(() => {
    if (formHasHydrated) {
      form.reset(formStore);
    }
  }, [formHasHydrated]);

  /**
   * This only set to zustand persist
   * when user navigate to another step,
   * reducing parent rerender
   */
  useEffect(() => {
    if (!formHasHydrated) return    
    const handleStepChange = (noStep: number) => {
      setForm(form.getValues());
      setStep(noStep);
    };
    handleStepChange(noStep);
  }, [noStep, formHasHydrated]);

  /**
   * Edge case of step url hacking
   * set it into state management zustand
   */
  useEffect(() => {
    if (!stepHasHydrated) return;

    const selectedSkills = form.getValues("selectedSkills");
    if (!selectedSkills.length && noStep > 1) {
      setStep(1);
      return;
    }

    setStep(noStep);
  }, [stepHasHydrated]);

  /**
   * Make sure that ui has rendered from the same data
   * as zustand persist localStorage
   */
  if (!formHasHydrated || !stepHasHydrated) return null;

  const handleSelfAssessmentSubmit = (_credentials: SelfAssessmentCredentials) => {
    router.push(`${pathname}?${searchParams.toString()}&status=confirmation`);
  }

  return (
    <>
      <FormProvider {...form}>
        <form action=""
          onSubmit={form.handleSubmit(handleSelfAssessmentSubmit)}
          className='w-full h-full flex items-center'
        >
          <AnimatePresence
            mode="wait"
            custom={direction}
          >
            {noStep == 1 && <InputSkills key="step-1" skills={skills}/>}
            {noStep == 2 && <InputSkillLevel key="step-2" skills={skills}/>}
          </AnimatePresence>
        </form>

        <nav className="absolute top-10 right-10">
          <ol className="w-full flex gap-3">
            {(Object.keys(formStore) as Array<keyof SelfAssessmentCredentials>).map(
              (state, index) => (
                <StepIndicator<SelfAssessmentCredentials>
                  key={index}
                  stateKey={state}
                  index={index}
                  currentStep={noStep}
                  setStep={setStep}
                />
              ),
            )}
          </ol>
        </nav>
      </FormProvider>

      {status === "confirmation" && (
        <ConfirmationQuizModal
          skillRatings={form.getValues("skillRatings")}
        />
      )}
    </>
  )
}
