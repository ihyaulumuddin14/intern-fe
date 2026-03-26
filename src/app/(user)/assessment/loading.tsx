import AssessmentSkeleton from "@/components/shared/skeletons/AssessmentSkeleton";

const LoadingAssessmentPage = () => {
  return (
    <section className="w-full h-dvh p-[clamp(12px,5vw,56px)] flex flex-col justify-center items-center">
      <AssessmentSkeleton />
    </section>
  );
};

export default LoadingAssessmentPage;
