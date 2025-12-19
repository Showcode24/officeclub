"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { ChevronDown } from "lucide-react"
import type { Section } from "@/lib/types"
import Image from "next/image"

export default function Hero({
  section,
  onOpenCategorySelector,
}: {
  section: Section
  onOpenCategorySelector: () => void
}) {
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true })

  const scrollToMenu = () => {
    document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" })
  }

  const handleViewMenu = () => {
    onOpenCategorySelector()
  }

  const sectionConfig = {
    office: {
      title: "FOURWINDS LAGOS",
      gradient: "from-amber-200 to-amber-500",
      buttonBg: "bg-amber-500 hover:bg-amber-400",
      accentColor: "text-amber-500",
      tagline: "Pure Joy",
      image: "/images/hero-image.jpg",
    },
    club: {
      title: "FOURWINDS LAGOS",
      gradient: "from-amber-200 to-amber-500",
      buttonBg: "bg-amber-500 hover:bg-amber-400",
      accentColor: "text-amber-500",
      tagline: "Pure Joy",
      image: "/images/hero-image.jpg",
    },
  }

  const config = sectionConfig[section]

  return (
    <div ref={ref} className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src={config.image || "/placeholder.svg"}
          alt="Luxury Ambience"
          fill
          priority
          className="object-cover opacity-60 transition-transform duration-1000 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black"></div>
      </div>

      <div className="relative z-10 text-center px-6 mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8"
        >
          {/* <div className="relative w-24 h-24 mx-auto mb-6">
            <Image src="/luxury-logo.jpg" alt="Logo" fill className="object-contain" />
          </div> */}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className={`text-4xl md:text-7xl font-bold mb-6 tracking-tight text-transparent bg-clip-text bg-gradient-to-r ${config.gradient}`}
        >
          {config.title}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, width: 0 }}
          animate={inView ? { opacity: 1, width: "120px" } : { opacity: 0, width: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="h-1 bg-amber-500 mx-auto mb-8 rounded-full shadow-[0_0_15px_rgba(245,158,11,0.5)]"
        ></motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-xl md:text-2xl font-light mb-10 text-zinc-100 uppercase tracking-[0.2em]"
        >
          {config.tagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="flex justify-center"
        >
          <button
            onClick={handleViewMenu}
            className={`inline-flex items-center px-10 py-4 ${config.buttonBg} text-black font-bold text-lg rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_25px_rgba(245,158,11,0.4)]`}
          >
            VIEW MENU
          </button>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 0.7 } : { opacity: 0 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
      >
        <button onClick={scrollToMenu} className="animate-bounce p-3 group" aria-label="Scroll down">
          <ChevronDown className={`${config.accentColor} transition-transform group-hover:scale-110`} size={32} />
        </button>
      </motion.div>
    </div>
  )
}
