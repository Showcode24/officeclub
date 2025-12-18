"use client"

import { MapPin } from "lucide-react"
import type { Section } from "@/lib/types"

interface SectionIndicatorProps {
  section: Section
}

export default function SectionIndicator({ section }: SectionIndicatorProps) {
  const sectionConfig = {
    office: {
      title: "FOURWINDS LAGOS",
      subtitle: "Indoor Dining Experience",
      className: "bg-amber-900/20 border-amber-700/30",
      textClassName: "text-amber-400",
    },
    club: {
      title: "FOURWINDS LAGOS",
      subtitle: "Outdoor Lounge & Club",
      className: "bg-amber-900/20 border-amber-700/30",
      textClassName: "text-amber-400",
    },
  }

  const config = sectionConfig[section]

  return (
    <div
      className={`fixed top-28 right-4 z-20 px-4 py-2 rounded-lg border backdrop-blur-md ${config.className} transition-all duration-500 ease-in-out animate-fade-in`}
    >
      <div className="flex items-center gap-2">
        <MapPin size={16} className={config.textClassName} />
        <div>
          <p className={`text-sm font-semibold ${config.textClassName}`}>{config.title}</p>
          <p className="text-xs text-zinc-400">{config.subtitle}</p>
        </div>
      </div>
    </div>
  )
}
