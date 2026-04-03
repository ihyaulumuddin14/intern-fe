import Loader from "@/components/shared/Loader"

const loading = () => {
  return (
    <div className='w-full h-dvh flex justify-center items-center'>
      <Loader size="lg" />
    </div>
  )
}

export default loading