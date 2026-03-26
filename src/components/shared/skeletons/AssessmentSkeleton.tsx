import Skeleton from "../Skeleton";

export default function AssessmentSkeleton() {
  return (
    <div className="w-full mx-auto flex flex-col items-center gap-14 py-10">
      {/* Title Skeleton */}
      <div className="flex flex-col items-center gap-3 w-full max-w-4xl">
        <Skeleton className="w-3/4 h-10 md:h-12" />
        <Skeleton className="w-1/2 h-10 md:h-12" />
      </div>

      <div className="flex flex-col mx-auto gap-8 w-full max-w-181.75">
        {/* Badge Skills Container Skeleton */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 lg:gap-5">
          {/* Kita buat loop 12 kali untuk simulasi kumpulan badge skill */}
          {Array.from({ length: 12 }).map((_, i) => (
            <Skeleton 
              key={i} 
              className="w-24 sm:w-32 h-10 rounded-full" 
            />
          ))}
        </div>

        {/* Button Skeleton */}
        <div className="flex justify-center mt-4">
          <Skeleton className="w-32 h-12 rounded-lg" />
        </div>
      </div>
    </div>
  );
}