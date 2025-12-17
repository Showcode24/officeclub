"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Building2, PartyPopper } from "lucide-react"
import type { Section } from "@/lib/types"

export default function SectionSwitcher() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const currentSection = (searchParams?.get("section") as Section) || "office"

  const handleSectionChange = (section: Section) => {
    const params = new URLSearchParams(searchParams?.toString())
    params.set("section", section)
    router.push(`?${params.toString()}`)
  }

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      <div className="bg-zinc-900/95 backdrop-blur-md rounded-full p-1.5 shadow-xl border border-zinc-800 flex gap-1">
        <button
          onClick={() => handleSectionChange("office")}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-full transition-all duration-300 ${
            currentSection === "office"
              ? "bg-amber-500 text-black font-medium shadow-lg shadow-amber-500/20"
              : "text-zinc-400 hover:text-white"
          }`}
          aria-label="Switch to The Office"
        >
          <Building2 size={18} />
          <span className="text-sm font-medium">The Office</span>
        </button>
        <button
          onClick={() => handleSectionChange("club")}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-full transition-all duration-300 ${
            currentSection === "club"
              ? "bg-purple-500 text-white font-medium shadow-lg shadow-purple-500/20"
              : "text-zinc-400 hover:text-white"
          }`}
          aria-label="Switch to The Club"
        >
          <PartyPopper size={18} />
          <span className="text-sm font-medium">The Club</span>
        </button>
      </div>
    </div>
  )
}
