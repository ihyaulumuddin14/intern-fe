import Loader from "@/components/shared/Loader";

const LoadingAssessmentPage = () => {
  return (
    <section className="w-full h-dvh p-[clamp(12px,5vw,56px)] flex flex-col justify-center items-center">
      <Loader size="lg" />
      <p className="text-sm sm:text-lg">Memuat data..</p>
    </section>
  );
};

export default LoadingAssessmentPage;
