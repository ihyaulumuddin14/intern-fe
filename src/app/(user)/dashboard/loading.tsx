import Loader from "@/components/shared/Loader"

const LoadingDashboard = () => {
  return (
    <section className="w-full h-dvh p-[clamp(12px,5vw,56px)] flex flex-col justify-center items-center">
      <Loader size="lg"/>
    </section>
  )
}

export default LoadingDashboard