"use client"
//New Addtiion
import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { ChevronDown } from "lucide-react"
import Image from "next/image"
import type { Section } from "@/lib/types"

export default function Hero({ section }: { section: Section }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true })

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.7
    }
  }, [])

  const scrollToMenu = () => {
    document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" })
  }

  const sectionConfig = {
    office: {
      title: "FOURWINDS LAGOS",
      gradient: "from-amber-200 to-amber-500",
      buttonBg: "bg-amber-500 hover:bg-amber-400",
      accentColor: "text-amber-500",
      tagline: "Pure Joy",
    },
    club: {
      title: "FOURWINDS LAGOS",
      gradient: "from-amber-200 to-amber-500",
      buttonBg: "bg-amber-500 hover:bg-amber-400",
      accentColor: "text-amber-500",
      tagline: "Pure Joy",
    },
  }

  const config = sectionConfig[section]

  return (
    <div ref={ref} className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <video ref={videoRef} autoPlay muted loop playsInline className="object-cover w-full h-full opacity-40">
          <source src="/videos/bar-ambiance.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black"></div>
      </div>

      <div className="relative z-10 text-center px-6 max-w-md mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-6"
        >
          {/* <div className="w-20 h-20 mx-auto mb-4">
            <Image src="/images/fourwinds logo.png" alt="FOURWINDS LAGOS | GRILL HOUSE | SPORT BAR | NIGHT CLUB Logo" width={100} height={100} />
          </div> */}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className={`text-4xl md:text-5xl font-bold mb-4 tracking-tight text-transparent bg-clip-text bg-gradient-to-r ${config.gradient}`}
        >
          {config.title}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, width: 0 }}
          animate={inView ? { opacity: 1, width: "100px" } : { opacity: 0, width: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="h-px bg-amber-500 mx-auto mb-6"
        ></motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-xl font-light mb-8 text-zinc-300"
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
            onClick={scrollToMenu}
            className={`inline-flex items-center px-8 py-3 ${config.buttonBg} text-black font-medium rounded-full transition-all duration-300 transform hover:scale-105`}
          >
            View Menu
          </button>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 0.7 } : { opacity: 0 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <button onClick={scrollToMenu} className="animate-bounce p-2" aria-label="Scroll down">
          <ChevronDown className={config.accentColor} size={28} />
        </button>
      </motion.div>
    </div>
  )
}
