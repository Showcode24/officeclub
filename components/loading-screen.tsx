"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export default function LoadingScreen() {
  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.3 + i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    }),
  }

  const lineVariants = {
    hidden: { width: 0 },
    visible: {
      width: "120px",
      transition: { delay: 1.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  }

  const logoVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { delay: 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  }

  const barName = "FOURWINDS LAGOS | GRILL HOUSE | SPORT BAR | NIGHT CLUB"

  return (
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50">
      <motion.div initial="hidden" animate="visible" variants={logoVariants} className="mb-6 relative w-20 h-20">
        <Image src="/images/fourwinds logo.png" alt="FOURWINDS LAGOS | GRILL HOUSE | SPORT BAR | NIGHT CLUB Logo" fill className="object-contain" priority />
      </motion.div>

      <div className="flex justify-center mb-4">
        {barName.split("").map((letter, i) => (
          <motion.span
            key={i}
            custom={i}
            variants={letterVariants}
            initial="hidden"
            animate="visible"
            className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-500"
          >
            {letter}
          </motion.span>
        ))}
      </div>

      <motion.div
        variants={lineVariants}
        initial="hidden"
        animate="visible"
        className="h-px bg-amber-500 mb-6"
      ></motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="flex items-center space-x-2"
      >
        <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
        <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" style={{ animationDelay: "0.2s" }}></div>
        <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" style={{ animationDelay: "0.4s" }}></div>
      </motion.div>
    </div>
  )
}
