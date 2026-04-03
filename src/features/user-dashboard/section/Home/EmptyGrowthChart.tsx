
export const EmptyGrowChart = () => {
  return (
    <div className="bg-white rounded-2xl border border-neutral-40 shadow-xs p-6 flex flex-col gap-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="font-medium text-neutral-100 text-[20px]">Skill Growth</h2>
          <p className="text-base text-neutral-70 mt-0.5">Perbandingan level saat ini vs target</p>
        </div>
      </div>

      <div className="w-full h-38.5 border-2 border-dotted rounded-lg flex justify-center items-center text-neutral-60">
        Data tidak tersedia
      </div>
    </div>
  )
}

