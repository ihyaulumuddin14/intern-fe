import React from 'react'

const EmptyBreakdown = () => {
  return (
    <div className="bg-white rounded-2xl border border-neutral-40 shadow-xs p-6 flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <h2 className="font-medium text-neutral-100 text-[20px]">
          Skill Breakdown
        </h2>
      </div>

      <div className="w-full h-38.5 border-2 border-dotted rounded-lg flex justify-center items-center text-neutral-60">
        Data belum tersedia.
      </div>
    </div>
  )
}

export default EmptyBreakdown