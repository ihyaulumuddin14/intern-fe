
const Skeleton = ({
  className
}: {
  className?: string
}) => {
  return (
    <div className={`bg-neutral-50 w-1/2 h-6 rounded-md animate-pulse ${className}`} />
  )
}

export default Skeleton