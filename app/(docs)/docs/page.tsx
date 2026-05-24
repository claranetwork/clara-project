"use client"

import Image from "next/image"

const Page = () => {
  return (
    <div className="flex flex-col items-center gap-8 animate-pulse">
      <div className="flex items-center gap-4">
        <div className="w-2 h-2  rounded-full animate-ping bg-green-50" />
        <h1 className="text-3xl md:text-4xl font-audio-wide">
          Docs coming soon
        </h1>
        <div className="w-2 h-2  rounded-full animate-ping" />
      </div>
      <p className="text-gray-400 text-lg font-khand">Thank you for your patience...</p>
    </div>
  )
}
export default Page
